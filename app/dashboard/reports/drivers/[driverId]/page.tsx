import Link from '@/components/link';
import { getDriverOrders } from '../actions/getDriverOrders';
import { Prisma } from '@prisma/client'; // Import Prisma
import { getDriversReport } from '../actions/getDriversReport';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

// Define types based on Prisma payloads
type DriverWithOrders = Prisma.DriverGetPayload<{ include: { orders: true } }>;
// Note: OrderWithCustomer type isn't strictly needed here as TS infers it from getDriverOrders

// Define correct props for Next.js App Router page components
interface DriverDetailsPageProps {
  params: Promise<{ driverId: string }>; // Revert to Promise
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>; // Revert to Promise
}

export default async function DriverDetailsPage({
  params,
  searchParams,
}: DriverDetailsPageProps) {
  const { driverId } = await params; // Await params
  const resolvedSearchParams = await searchParams; // Await searchParams
  const page = resolvedSearchParams?.page ? Number(resolvedSearchParams.page) : 1; // Access resolved object
  const pageSize = 10;

  // Fetch driver info (name, etc)
  const drivers: DriverWithOrders[] = await getDriversReport(); // Type drivers array
  const driver = drivers.find((d: DriverWithOrders) => d.id === driverId); // Use correct type for d

  // Fetch orders for this driver
  const { orders, totalCount } = await getDriverOrders(driverId, page, pageSize);
  const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));

  return (
    <div className='mx-auto max-w-4xl py-8'>
      <div className='mb-4 flex items-center justify-between'>
        <h2 className='text-2xl font-bold'>تفاصيل السائق: {driver?.name || driverId}</h2>
        <Link
          href='/dashboard/reports/drivers'
          className='rounded bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700'
        >
          رجوع
        </Link>
      </div>
      <Table>
        <TableHeader>
          <TableRow className='text-right'>
            <TableHead className='text-right'>رقم الطلب</TableHead>
            <TableHead className='text-right'>الحالة</TableHead>
            <TableHead className='text-right'>المبلغ</TableHead>
            <TableHead className='text-right'>العميل</TableHead>
            <TableHead className='text-right'>تاريخ الطلب</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className='text-center text-gray-400'>
                لا توجد طلبات لهذا السائق
              </TableCell>
            </TableRow>
          ) : (
            orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className='text-right'>{order.orderNumber || order.id}</TableCell>
                <TableCell className='text-right'>{order.status}</TableCell>
                <TableCell className='text-right'>
                  {order.amount?.toLocaleString('ar-EG', { minimumFractionDigits: 2 })} ر.س
                </TableCell>
                <TableCell className='text-right'>{order.customer?.name || '-'}</TableCell>
                <TableCell className='text-right'>
                  {order.createdAt ? new Date(order.createdAt).toLocaleString('ar-EG') : '-'}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
      {/* Pagination Controls */}
      {
        totalPages > 1 && (
          <div className='mt-4 flex items-center justify-between'>
            <a
              className='rounded bg-gray-200 px-3 py-1 disabled:opacity-50'
              href={`?page=${page - 1}`}
              aria-disabled={page === 1}
              tabIndex={page === 1 ? -1 : 0}
              style={{ pointerEvents: page === 1 ? 'none' : 'auto' }}
            >
              السابق
            </a>
            <span>
              صفحة {page} من {totalPages}
            </span>
            <a
              className='rounded bg-gray-200 px-3 py-1 disabled:opacity-50'
              href={`?page=${page + 1}`}
              aria-disabled={page === totalPages}
              tabIndex={page === totalPages ? -1 : 0}
              style={{ pointerEvents: page === totalPages ? 'none' : 'auto' }}
            >
              التالي
            </a>
          </div>
        )
      }
    </div>
  );
}
