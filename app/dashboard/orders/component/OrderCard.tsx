'use client';
import React, { useMemo } from 'react';

import { formatDistanceToNow } from 'date-fns';
import { ar } from 'date-fns/locale';
import {
  MousePointerBan, Truck, CheckCircle, X, Calendar, RefreshCw, Phone, AlertCircle, MapPinX, MapPin, List, ReceiptText, User
} from 'lucide-react'; // Import directly
import { iconVariants } from '@/lib/utils'; // Import CVA variants

import Link from '@/components/link';
import { Badge } from '@/components/ui/badge';
import { Button, buttonVariants } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Order } from '@/types/cardType';

import { STATUS_STYLES, STATUS_TRANSLATIONS } from '../helper/helper';

// Memoized StatusIcon
const StatusIcon = React.memo(({ status }: { status: string }) => {
  const icons: Record<string, React.ReactNode> = {
    Pending: <MousePointerBan className={iconVariants({ size: 'xs', className: 'text-primary-foreground' })} />,
    InWay: <Truck className={iconVariants({ size: 'xs', className: 'text-primary-foreground' })} />, // Assuming LazyTruckIcon should be Truck
    Delivered: <CheckCircle className={iconVariants({ size: 'xs', className: 'text-primary-foreground' })} />,
    canceled: <X className={iconVariants({ size: 'xs', className: 'text-primary-foreground' })} />,
  };
  return icons[status] || <Truck className={iconVariants({ size: 'xs', className: 'text-gray-500' })} />;
});
StatusIcon.displayName = 'StatusIcon'; // Add display name

// Memoized OrderHeader
const OrderHeader = React.memo(({ order }: { order: Order }) => {
  const statusStyle = useMemo(
    () => STATUS_STYLES[order.status] || STATUS_STYLES.Default,
    [order.status],
  );
  const createdAt = useMemo(
    () => formatDistanceToNow(new Date(order.createdAt), { addSuffix: true, locale: ar }),
    [order.createdAt],
  );
  const updatedAt = useMemo(
    () => formatDistanceToNow(new Date(order.updatedAt), { addSuffix: true, locale: ar }),
    [order.updatedAt],
  );

  return (
    <CardHeader className='flex flex-col'>
      <div className='flex items-center justify-between'>
        <Badge className={`flex items-center justify-center gap-2 ${statusStyle.color}`}>
          <StatusIcon status={order.status} />
          {STATUS_TRANSLATIONS[order.status as keyof typeof STATUS_TRANSLATIONS] ||
            STATUS_TRANSLATIONS.Default}
        </Badge>
        <CardTitle className='text-lg font-bold text-red-500'>
          {order.amount.toFixed(2)} SAR
        </CardTitle>
      </div>
      <div className='flex flex-wrap items-center justify-between text-sm text-muted-foreground'>
        <div className='flex items-center gap-2'>
          <Calendar className={iconVariants({ size: 'xs', className: 'text-muted-foreground' })} />
          <p className='text-xs'>{createdAt}</p>
        </div>
        <div className='flex items-center gap-2'>
          <RefreshCw className={iconVariants({ size: 'xs', className: 'text-muted-foreground' })} />
          <p className='text-xs'>{updatedAt}</p>
        </div>
      </div>
    </CardHeader>
  );
});
OrderHeader.displayName = 'OrderHeader'; // Add display name

// Memoized CustmerCardAction
const CustmerCardAction = React.memo(
  ({
    phone,
    address,
    latitude,
    longitude,
    // orderNo, // Removed unused prop
  }: {
    phone: string;
    address: string;
    latitude: string;
    longitude: string;
    // orderNo: string; // Removed unused prop from type as well
  }) => (
    <div className='flex items-center gap-4 self-end'>
      <Button
        variant='secondary'
        size='icon'
        title={phone || 'غير موجود'}
        className='flex items-center gap-2 text-sm'
      >
        <Phone className={iconVariants({ size: 'xs', className: 'text-muted-foreground' })} />
      </Button>
      <Button
        variant='secondary'
        size='icon'
        title={address || ' الاحداثيات متوفرة ولكن العنوان غير متوفر'}
        className='relative flex items-center gap-2 text-sm'
        disabled={!latitude || !longitude} // Disable if either lat or lon is missing
      >
        {!address && latitude && longitude && ( // Show alert only if address is missing but coords exist
          <div className='absolute -left-2 -top-2'>
            <AlertCircle className={iconVariants({ size: 'xs', className: 'text-destructive' })} />
          </div>
        )}
        {!latitude || !longitude ? (
          <MapPinX className={iconVariants({ size: 'xs', className: 'text-destructive' })} />
        ) : (
          <a
            href={`https://www.google.com/maps?q=${latitude},${longitude}`}
            target='_blank'
            rel='noopener noreferrer'
          >
            <MapPin className={iconVariants({ size: 'xs', className: 'text-muted-foreground' })} />
          </a>
        )}
      </Button>
    </div>
  ),
);
CustmerCardAction.displayName = 'CustmerCardAction'; // Add display name

// Memoized OrderContent
const OrderContent = React.memo(({ order }: { order: Order }) => (
  <CardContent className='space-y-2 text-foreground'>
    <div className='flex w-full items-center justify-between'>
      <CardTitle className='flex items-center gap-2 text-sm'>
        <List className={iconVariants({ size: 'xs', className: 'text-muted-foreground' })} />
        {order.orderNumber}
      </CardTitle>
      <Link
        href={`/dashboard/show-invoice/${order.id}`}
        className={buttonVariants({
          variant: 'secondary',
          size: 'icon',
          className: 'flex items-center gap-2 text-sm',
        })}
      >
        <ReceiptText className={iconVariants({ size: 'xs', className: 'text-muted-foreground' })} />
      </Link>
    </div>

    <div className='flex w-full flex-wrap items-center justify-between'>
      <CardDescription className='flex items-center gap-2 text-sm'>
        <User className={iconVariants({ size: 'xs', className: 'text-muted-foreground' })} />
        {order.customer?.name || 'Unknown Customer'}
      </CardDescription>

      <CustmerCardAction
        phone={order.customer.phone}
        address={order?.customer?.address || ''}
        latitude={order.customer.latitude}
        longitude={order.customer.longitude}
      // orderNo={order.id} // Prop no longer expected by CustmerCardAction
      />
    </div>

    {order.driver?.name && (
      <CardTitle className='flex w-full items-center justify-end gap-2 text-xs'>
        <Truck className={iconVariants({ size: 'xs', className: 'flex items-center gap-2 text-sm' })} />
        {order.driver?.name || 'Unknown Driver'}
      </CardTitle>
    )}
    {order.status === 'canceled' && (
      <div className='flex flex-wrap items-center gap-2 text-wrap rounded bg-red-50 p-2 text-sm'>
        <AlertCircle className={iconVariants({ size: 'sm' })} />
        {order.resonOfcancel || 'لايوجد سبب'}
      </div>
    )}
  </CardContent>
));
OrderContent.displayName = 'OrderContent'; // Add display name

// Memoized OrderFooter
const OrderFooter = React.memo(({ order }: { order: Order }) => (
  <CardFooter className='flex items-end gap-2'>
    <div className='flex w-full items-center justify-between gap-2'>
      {order.status === 'InWay' &&
        (order.isTripStart ? (
          <Link
            href={`/dashboard/track/${order.id}`}
            className='flex w-full items-center justify-center gap-2 rounded-md bg-primary/80 p-2 text-white'
          >
            <MapPin className={iconVariants({ size: 'xs' })} />
            <p>تتبع الطلبية</p>
          </Link>
        ) : (
          <div className='flex w-full items-center justify-center gap-2 rounded-md bg-gray-200 p-2 text-gray-600'>
            <MapPin className={iconVariants({ size: 'xs' })} />
            <p> لم تبدأ بعد</p>
          </div>
        ))}
      {order.status === 'Pending' && (
        <Link
          href={`/dashboard/show-invoice/${order.id}?status=ship`}
          prefetch={false}
          className='flex w-full items-center justify-center gap-2 rounded-md bg-primary p-2 text-white shadow-md hover:bg-yellow-600'
        >
          <Truck className={iconVariants({ size: 'xs' })} />
          <p>شحن الطلبية</p>
        </Link>
      )}
    </div>
  </CardFooter>
));
OrderFooter.displayName = 'OrderFooter'; // Add display name

// Main Component: OrderCard
const OrderCard = React.memo(({ order }: { order: Order }) => {
  const statusStyle = useMemo(
    () => STATUS_STYLES[order.status] || STATUS_STYLES.Default,
    [order.status],
  );

  return (
    <Card className={`rounded-lg shadow-md ${statusStyle.border}`}>
      <OrderHeader order={order} />
      <OrderContent order={order} />
      <OrderFooter order={order} />
    </Card>
  );
});
OrderCard.displayName = 'OrderCard'; // Add display name

export default OrderCard;
