import BackButton from '../../../../components/BackButton';
import { fetchTrackInfo } from '../action/action';

export default async function Page({ params }: { params: Promise<{ orderid: string }> }) {
  const { orderid } = await params;
  const trackInfo = await fetchTrackInfo(orderid);

  // Fallback coordinates if none provided
  const latitude = trackInfo?.latitude || 0;
  const longitude = trackInfo?.longitude || 0;

  // Construct Google Maps URL without API key
  const mapUrl = `https://maps.google.com/maps?q=${latitude},${longitude}&z=16&output=embed`;

  return (
    <div className='min-h-screen w-full bg-gray-100 p-6'>
      <div className='mx-auto max-w-2xl overflow-hidden rounded-xl bg-white shadow-lg'>
        {/* Header Section */}
        <div className='flex items-center justify-between bg-blue-600 p-4 text-white'>
          <h1 className='text-lg font-semibold'>
            رقم الطلبية: {trackInfo?.order.orderNumber || 'غير متوفر'}
          </h1>
          <BackButton />
        </div>

        {/* Order Details */}
        <div className='space-y-6 p-6'>
          <div className='grid grid-cols-2 gap-4 rounded-lg bg-gray-50 p-4'>
            <div className='flex flex-col'>
              <span className='text-sm text-gray-500'>اسم العميل</span>
              <span className='font-medium text-gray-800'>
                {trackInfo?.order.customerName || 'غير محدد'}
              </span>
            </div>
            <div className='flex flex-col text-right'>
              <span className='text-sm text-gray-500'>الإجمالي</span>
              <span className='font-medium text-gray-800'>
                {trackInfo?.order.amount ? `${trackInfo.order.amount} ريال` : 'غير محدد'}
              </span>
            </div>
          </div>

          <div className='flex flex-col rounded-lg bg-gray-50 p-4'>
            <span className='text-sm text-gray-500'>اسم السائق</span>
            <span className='font-medium text-gray-800'>
              {trackInfo?.driver.name || 'غير معين'}
            </span>
          </div>
        </div>

        {/* Map Section */}
        <div className='p-6 pt-0'>
          <h2 className='mb-3 font-semibold text-gray-700'>موقع التوصيل</h2>
          {latitude !== 0 && longitude !== 0 ? (
            <div className='relative h-96 w-full overflow-hidden rounded-lg border border-gray-200 shadow-sm'>
              <iframe
                width='100%'
                height='100%'
                frameBorder='0'
                style={{ border: 0 }}
                allowFullScreen
                referrerPolicy='no-referrer-when-downgrade'
                src={mapUrl}
                title='Delivery Location'
              />
            </div>
          ) : (
            <div className='flex h-96 w-full items-center justify-center rounded-lg bg-gray-200'>
              <p className='text-center text-gray-500'>الموقع غير متوفر</p>
            </div>
          )}
          <div className='mt-3 text-center'>
            <p className='text-sm text-gray-600'>
              الإحداثيات:{' '}
              <span className='font-medium'>
                {latitude !== 0 || longitude !== 0
                  ? `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`
                  : 'غير متوفرة'}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
