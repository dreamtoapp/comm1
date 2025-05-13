import { Card, CardContent } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface InventoryTableProps {
  products: Array<{
    id: string;
    name: string;
    price: number;
    outOfStock: boolean;
    createdAt: string;
    updatedAt: string;
    supplier?: { name?: string } | null;
  }>;
}

export function InventoryTable({ products }: InventoryTableProps) {
  return (
    <Card>
      <CardContent className='overflow-x-auto p-0'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-right">المنتج</TableHead>
              <TableHead className="text-right">الشركة</TableHead>
              <TableHead className="text-right">السعر</TableHead>
              <TableHead className="text-right">الحالة</TableHead>
              <TableHead className="text-right">تاريخ الإضافة</TableHead>
              <TableHead className="text-right">آخر تحديث</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className='py-10 text-center text-muted-foreground'>
                  لا توجد بيانات مخزون لعرضها.
                </TableCell>
              </TableRow>
            ) : (
              products.map((p) => (
                <TableRow key={p.id} className={p.outOfStock ? 'bg-destructive-soft-bg/50 hover:bg-destructive-soft-bg' : 'hover:bg-muted/50'}>
                  <TableCell className='font-medium'>{p.name}</TableCell>
                  <TableCell className="text-muted-foreground">{p.supplier?.name || '-'}</TableCell>
                  <TableCell>{p.price?.toLocaleString('ar-EG', { minimumFractionDigits: 2 })} ر.س</TableCell>
                  <TableCell>
                    {p.outOfStock ? (
                      <span className='font-semibold text-destructive-foreground'>غير متوفر</span>
                    ) : (
                      <span className='font-semibold text-success-foreground'>متوفر</span>
                    )}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {p.createdAt ? new Date(p.createdAt).toLocaleDateString('ar-EG') : '-'}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {p.updatedAt ? new Date(p.updatedAt).toLocaleDateString('ar-EG') : '-'}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
