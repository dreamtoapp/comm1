// lib/cloudinary.ts
import cloudinary from 'cloudinary';

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function ensureFolderExists(folderName: string) {
  try {
    await cloudinary.v2.api.create_folder(folderName);
  } catch (error: unknown) {
    if (
      error instanceof Error &&
      'http_code' in error &&
      error.http_code === 409 &&
      error.message.includes('already exists')
    ) {
      // Folder already exists, no action needed
    } else {
      console.error(`Unexpected error ensuring folder exists:`, error);
      throw new Error(
        `Failed to ensure folder exists: ${error instanceof Error ? error.message : 'Unknown error'}`,
      );
    }
  }
}

export async function uploadImageToCloudinary(file: File, presetName: string) {
  const folderName = process.env.CLOUDINARY_FOLDER || 'amwag';
  const uploadPresetName = presetName;

  await ensureFolderExists(folderName);

  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', uploadPresetName);
  formData.append('folder', folderName);

  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: 'POST',
        body: formData,
      },
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Cloudinary API Error:', errorData);
      throw new Error(`Cloudinary upload failed: ${errorData.error?.message || 'Unknown error'}`);
    }

    const data = await response.json();

    if (!data.secure_url || !data.public_id) {
      throw new Error('Failed to retrieve secure URL or public ID from Cloudinary.');
    }

    const optimizedUrl = cloudinary.v2.url(data.public_id, {
      width: 80,
      height: 80,
      crop: 'fill',
      quality: 'auto',
      format: 'webp',
    });

    return {
      secure_url: optimizedUrl,
      public_id: data.public_id,
    };
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Error uploading image to Cloudinary:', errorMessage);
    throw new Error(`Failed to upload image to Cloudinary: ${errorMessage}`);
  }
}

export default cloudinary.v2;

export interface CloudinaryUploadResult {
  secure_url: string;
  public_id: string;
}

// // lib/cloudinary.ts
// import cloudinary from 'cloudinary';

// // Configure Cloudinary using environment variables
// cloudinary.v2.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// /**
//  * Ensures that the specified folder exists in Cloudinary.
//  * If the folder does not exist, it will be created.
//  * @param folderName - The name of the folder to check/create.
//  */
// async function ensureFolderExists(folderName: string) {
//   try {
//     // Attempt to create the folder
//     await cloudinary.v2.api.create_folder(folderName);
//   } catch (error) {
//     if (error.http_code === 409 && error.message.includes('already exists')) {
//     } else {
//       console.error(`Unexpected error ensuring folder '${folderName}' exists:`, error);
//       throw new Error(`Failed to ensure folder '${folderName}' exists: ${error.message || 'Unknown error'}`);
//     }
//   }
// }

// /**
//  * Uploads an image file to Cloudinary.
//  * @param file - The image file to upload.
//  * @returns An object containing the secure URL and public ID of the uploaded image.
//  */
// export async function uploadImageToCloudinary(
//   file: File,
//   presetName: string, // Accept preset name as a parameter
// ) {
//   const folderName = process.env.CLOUDINARY_FOLDER || 'amwag'; // Default folder
//   const uploadPresetName = presetName; // Use the provided preset name

//   // Ensure the folder exists (optional, depending on your setup)
//   await ensureFolderExists(folderName);

//   const formData = new FormData();
//   formData.append('file', file);
//   formData.append('upload_preset', uploadPresetName); // Use the provided preset
//   formData.append('folder', folderName); // Specify the folder

//   try {
//     const response = await fetch(`https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload`, {
//       method: 'POST',
//       body: formData,
//     });

//     if (!response.ok) {
//       const errorData = await response.json();
//       console.error('Cloudinary API Error:', errorData);
//       throw new Error(`Cloudinary upload failed: ${errorData.error?.message || 'Unknown error'}`);
//     }

//     const data = await response.json();

//     if (!data.secure_url || !data.public_id) {
//       throw new Error('Failed to retrieve secure URL or public ID from Cloudinary.');
//     }

//     // Generate an optimized URL
//     const optimizedUrl = cloudinary.v2.url(data.public_id, {
//       width: 80,
//       height: 80,
//       crop: 'fill',
//       quality: 'auto',
//       format: 'webp',
//     });

//     return {
//       secure_url: optimizedUrl, // Return the optimized URL
//       public_id: data.public_id, // Return the public ID
//     };
//   } catch (error) {
//     console.error('Error uploading image to Cloudinary:', error.message);
//     throw new Error('Failed to upload image to Cloudinary.');
//   }
// }

// export default cloudinary.v2;

// export interface CloudinaryUploadResult {
//   secure_url: string;
//   public_id: string;
// }
