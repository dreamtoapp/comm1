'use server';
import { revalidatePath } from 'next/cache';
import { Prisma, PromotionType, DiscountType } from '@prisma/client';
import db from '@/lib/prisma';
import { ImageToCloudinary } from '@/lib/cloudinary/uploadImageToCloudinary';

interface PrevState {
  success: boolean;
  message: string;
  errors?: Record<string, string[] | null>;
}

export async function updatePromotion(prevState: PrevState, formData: FormData): Promise<PrevState> {
  const id = formData.get('id') as string;
  if (!id) {
    return { success: false, message: "معرف العرض مفقود." };
  }

  const title = formData.get('title') as string;
  const description = formData.get('description') as string | null;
  const type = formData.get('type') as PromotionType | null;
  const discountValueStr = formData.get('discountValue') as string | null;
  const discountType = formData.get('discountType') as DiscountType | null;
  const productIdsStr = formData.get('productIds') as string | null;
  // const couponCode = formData.get('couponCode') as string | null; // Commented out
  const minimumOrderValueStr = formData.get('minimumOrderValue') as string | null;
  const startDateStr = formData.get('startDate') as string | null;
  const endDateStr = formData.get('endDate') as string | null;
  const imageFile = formData.get('image') as File | null;
  const removeImage = formData.get('removeImage') === 'true';
  const active = formData.get('active') === 'on';

  // --- Validation ---
  if (!title) return { success: false, message: "عنوان العرض مطلوب.", errors: { title: ["العنوان مطلوب"] } };
  if (!type) return { success: false, message: "نوع العرض مطلوب.", errors: { type: ["النوع مطلوب"] } };

  let discountValue: number | null = null;
  if (discountValueStr) {
    discountValue = parseFloat(discountValueStr);
    if (isNaN(discountValue)) return { success: false, message: "قيمة الخصم يجب أن تكون رقمًا.", errors: { discountValue: ["قيمة غير صالحة"] } };
  }
  if (discountValue !== null && !discountType) {
    return { success: false, message: "نوع قيمة الخصم مطلوب عند إدخال قيمة للخصم.", errors: { discountType: ["مطلوب"] } };
  }

  let productIds: string[] = [];
  if (productIdsStr && productIdsStr.trim() !== '') {
    productIds = productIdsStr.split(',').map(id => id.trim()).filter(id => id);
  }

  let minimumOrderValue: number | null = null;
  if (minimumOrderValueStr) {
    minimumOrderValue = parseFloat(minimumOrderValueStr);
    if (isNaN(minimumOrderValue)) return { success: false, message: "الحد الأدنى لقيمة الطلب يجب أن تكون رقمًا.", errors: { minimumOrderValue: ["قيمة غير صالحة"] } };
  }

  const startDate = startDateStr ? new Date(startDateStr) : null;
  const endDate = endDateStr ? new Date(endDateStr) : null;
  if (startDate && endDate && startDate >= endDate) {
    return { success: false, message: "تاريخ الانتهاء يجب أن يكون بعد تاريخ البدء.", errors: { endDate: ["يجب أن يكون بعد تاريخ البدء"] } };
  }

  // --- Prepare Update Data ---
  const updateData: Prisma.PromotionUpdateInput = {
    title,
    description: description ?? undefined,
    type,
    discountValue,
    discountType,
    productIds,
    // couponCode: couponCode || undefined, // Commented out
    minimumOrderValue,
    startDate,
    endDate,
    active,
  };
  // if (!updateData.couponCode) delete updateData.couponCode; // Commented out


  // --- Image Handling ---
  if (removeImage) {
    updateData.imageUrl = null;
    // TODO: Delete old image from Cloudinary
  } else if (imageFile && imageFile.size > 0) {
    try {
      // TODO: Delete old image from Cloudinary before uploading new one
      const imageData = await ImageToCloudinary(
        imageFile,
        process.env.CLOUDINARY_UPLOAD_PRESET_PROMOTIONS || 'default_preset_for_promotions'
      );
      if (imageData.result?.secure_url) {
        updateData.imageUrl = imageData.result.secure_url;
      } else {
        console.warn("Promotion image update failed, existing image preserved unless removed:", imageData.error);
      }
    } catch (uploadError) {
      console.error("Error uploading new promotion image for update:", uploadError);
    }
  }

  try {
    await db.promotion.update({
      where: { id },
      data: updateData,
    });
    revalidatePath('/dashboard/promotions');
    revalidatePath(`/dashboard/promotions/edit/${id}`);
    return { success: true, message: 'تم تحديث العرض بنجاح!' };
  } catch (error: unknown) {
    console.error('Error updating promotion:', error);
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      // Commented out couponCode specific error handling
      // if (error.code === 'P2002' && error.meta?.target === 'Promotion_couponCode_key') {
      //   return { success: false, message: 'كود الخصم هذا مستخدم بالفعل.', errors: { couponCode: ["مستخدم بالفعل"] } };
      // }
      if (error.code === 'P2025') {
        return { success: false, message: 'العرض المراد تحديثه غير موجود.' };
      }
    }
    return { success: false, message: 'فشل تحديث العرض. يرجى المحاولة مرة أخرى.' };
  }
  // Fallback return
  return { success: false, message: 'حدث خطأ غير متوقع وغير معالج.' };
}
