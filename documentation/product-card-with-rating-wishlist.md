# بطاقة المنتج مع التقييم وقائمة الرغبات

## تصميم مبدئي (Mockup)

```
┌────────────────────────────────┐
│                           ♡ ✓  │  ← أيقونة قائمة الرغبات (♡/♥) ومؤشر السلة
│                                │
│                                │
│         صورة المنتج          │
│                                │
│                                │
├────────────────────────────────┤
│ اسم المنتج                   │  ← عنوان المنتج مع علامة الحذف (...)
│                                │
│ وصف المنتج الذي قد يمتد      │  ← تفاصيل المنتج بحد أقصى سطرين
│ لعدة أسطر...                 │
│                                │
│ ★★★★☆  4.2 (24)               │  ← نجوم التقييم، الدرجة وعدد المراجعات
│                                │
│ $99.99                         │  ← السعر
│                                │
│       [-]    2    [+]          │  ← أدوات التحكم في الكمية
│                                │
├────────────────────────────────┤
│      [زر إضافة إلى السلة]      │  ← زر الإجراء
└────────────────────────────────┘
```

## تفاصيل التنفيذ

### 1. ميزة قائمة الرغبات
- إضافة أيقونة قلب (♡/♥) في الزاوية العلوية اليمنى للبطاقة.
- التبديل بين الحالة المفرغة (♡) والمملوءة (♥) عند النقر.
- تخزين عناصر قائمة الرغبات في التخزين المحلي أو حساب المستخدم إذا كان مسجلاً دخوله.
- إضافة حركة بسيطة عند الإضافة/الإزالة من قائمة الرغبات.

### 2. نظام التقييم
- عرض 5 نجوم مع تعبئة مناسبة بناءً على التقييم.
- إظهار متوسط التقييم (مثل 4.2) بجانب النجوم.
- إظهار عدد المراجعات بين قوسين (مثل (24)).
- جعل النجوم أصغر قليلاً من العناصر الأخرى للحفاظ على التسلسل الهرمي.
- استخدام لون مناسب (ذهبي/عنبري) للنجوم الممتلئة.

### 3. تنفيذ الكود

```tsx
// أضف هذه الاستيرادات
import { Heart, Star, StarHalf } from 'lucide-react';
import { useWishlistStore } from '@/store/wishlistStore';

// داخل مكون ProductCard
const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlistStore();
const [isWishlisted, setIsWishlisted] = useState(isInWishlist(product.id));

const toggleWishlist = (e: React.MouseEvent) => {
  e.stopPropagation();
  if (isWishlisted) {
    removeFromWishlist(product.id);
  } else {
    addToWishlist(product);
  }
  setIsWishlisted(!isWishlisted);
};

// عرض النجوم بناءً على التقييم
const renderStars = (rating: number) => {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  
  for (let i = 0; i < fullStars; i++) {
    stars.push(<Star key={i} size={14} className="fill-amber-400 text-amber-400" />);
  }
  
  if (hasHalfStar) {
    stars.push(<StarHalf key="half" size={14} className="fill-amber-400 text-amber-400" />);
  }
  
  const remainingStars = 5 - stars.length;
  for (let i = 0; i < remainingStars; i++) {
    stars.push(<Star key={`empty-${i}`} size={14} className="text-gray-300" />);
  }
  
  return stars;
};
```

### 4. تحديث تصميم البطاقة

```tsx
<Card className="rounded-2xl shadow-md overflow-hidden relative bg-card border-border hover:shadow-lg transition-shadow duration-300 flex flex-col h-[500px]">
  {/* زر قائمة الرغبات */}
  <button 
    onClick={toggleWishlist}
    className="absolute top-2 left-2 z-10 p-2 rounded-full bg-white/80 hover:bg-white transition-colors duration-200 shadow-sm"
    aria-label={isWishlisted ? "إزالة من المفضلة" : "إضافة إلى المفضلة"}
  >
    <Heart 
      size={18} 
      className={cn(
        "transition-colors duration-300",
        isWishlisted ? "fill-red-500 text-red-500" : "text-gray-500 hover:text-red-400"
      )} 
    />
  </button>
  
  {/* مؤشر السلة (الكود الحالي) */}
  {isInCart && (
    <div className="absolute top-2 right-2 z-10 bg-green-500 text-white rounded-full p-2 shadow-lg animate-fadeIn">
      <Check size={16} />
    </div>
  )}
  
  {/* باقي البطاقة يبقى كما هو */}
  <CardHeader>...</CardHeader>
  
  <CardContent>
    {/* عنوان المنتج */}
    <h3 className="text-base font-bold text-foreground line-clamp-1 mb-1">{product.name}</h3>
    
    {/* تفاصيل المنتج */}
    <p className="text-muted-foreground text-sm line-clamp-2 mb-2 h-10">{product.details}</p>
    
    {/* قسم التقييم - جديد */}
    <div className="flex items-center gap-1 mb-2">
      <div className="flex">{renderStars(product.rating || 0)}</div>
      <span className="text-xs text-muted-foreground">
        {product.rating?.toFixed(1) || "0.0"} ({product.reviewCount || 0})
      </span>
    </div>
    
    {/* فاصل */}
    <div className="flex-grow min-h-[10px]"></div>
    
    {/* قسم السعر */}
    <div className="flex justify-between items-center text-sm font-semibold text-foreground mb-2">
      {/* كود السعر الحالي */}
    </div>
    
    {/* أدوات التحكم في الكمية */}
    {/* أدوات التحكم في الكمية الحالية */}
  </CardContent>
  
  <CardFooter>
    {/* كود التذييل الحالي */}
  </CardFooter>
</Card>
```

## تحديثات مخطط قاعدة البيانات

لدعم وظائف التقييمات وقائمة الرغبات، ستحتاج إلى تحديث مخطط Prisma الخاص بك:

```prisma
// أضف إلى نموذج المنتج الخاص بك
model Product {
  // الحقول الحالية
  id          String    @id @default(cuid())
  name        String
  price       Float
  // ...
  
  // حقول جديدة
  rating      Float?    // متوسط التقييم
  reviewCount Int       @default(0) // عدد المراجعات
  reviews     Review[]  // علاقة بالمراجعات
  wishlistedBy WishlistItem[] // علاقة بعناصر قائمة الرغبات
}

// نماذج جديدة
model Review {
  id        String   @id @default(cuid())
  rating    Int      // 1-5 نجوم
  comment   String?  // نص المراجعة
  productId String
  userId    String
  createdAt DateTime @default(now())
  
  // العلاقات
  product   Product  @relation(fields: [productId], references: [id])
  user      User     @relation(fields: [userId], references: [id])
  
  @@index([productId])
  @@index([userId])
}

model WishlistItem {
  id        String   @id @default(cuid())
  productId String
  userId    String
  createdAt DateTime @default(now())
  
  // العلاقات
  product   Product  @relation(fields: [productId], references: [id])
  user      User     @relation(fields: [userId], references: [id])
  
  @@unique([productId, userId]) // منع التكرارات
  @@index([userId])
}
```

## تنفيذ مخزن قائمة الرغبات (Wishlist Store)

```tsx
// store/wishlistStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product } from "@/types/product";

interface WishlistState {
  items: Record<string, Product>;
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string) => void;
  clearWishlist: () => void;
  isInWishlist: (productId: string) => boolean;
  getWishlistCount: () => number;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: {},
      
      addToWishlist: (product) => 
        set((state) => ({
          items: { ...state.items, [product.id]: product }
        })),
      
      removeFromWishlist: (productId) => 
        set((state) => {
          const newItems = { ...state.items };
          delete newItems[productId];
          return { items: newItems };
        }),
      
      clearWishlist: () => set({ items: {} }),
      
      isInWishlist: (productId) => !!get().items[productId],
      
      getWishlistCount: () => Object.keys(get().items).length
    }),
    { name: "wishlist-storage" }
  )
);
