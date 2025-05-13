> www.amwag.com@1.1.18 check-types C:\Users\w2nad\Desktop\dta\projects\www.dev-ecomm.com
> tsc --noEmit

app/(e-comm)/actions/cart.ts(3,1): error TS6133: 'auth' is declared but its value is never read.
app/(e-comm)/actions/cart.ts(4,1): error TS6133: 'db' is declared but its value is never read.
app/(e-comm)/auth/login/action/userLogin.ts(7,33): error TS6133: 'prevState' is declared but its value is never read.
app/(e-comm)/auth/login/action/userLogin.ts(31,11): error TS6133: 'result' is declared but its value is never read.
app/(e-comm)/auth/login/component/login-from.tsx(15,35): error TS6133: 'redirect' is declared but its value is never read.
app/(e-comm)/auth/login/component/login-from.tsx(16,9): error TS6133: 'router' is declared but its value is never read.
app/(e-comm)/auth/register/action/actions.ts(6,36): error TS6133: 'prevState' is declared but its value is never read.
app/(e-comm)/auth/register/action/actions.ts(11,9): error TS6133: 'confirmPassword' is declared but its value is never read.
app/(e-comm)/auth/register/action/actions.ts(31,9): error TS6133: 'newUser' is declared but its value is never read.
app/(e-comm)/auth/register/component/register-form.tsx(108,9): error TS6133: 'router' is declared but its value is never read.
app/(e-comm)/cart/component/cart-items-List.tsx(26,57): error TS6133: 'type' is declared but its value is never read.
app/(e-comm)/cart/component/check-out-button.tsx(20,1): error TS6133: 'Alert' is declared but its value is never read.
app/(e-comm)/cart/page.tsx(21,9): error TS6133: 'router' is declared but its value is never read.
app/(e-comm)/checkout/components/MiniCartSummary.tsx(29,32): error TS6133: 'getTotalItems' is declared but its value is never read.
app/(e-comm)/checkout/components/TermsDialog.tsx(62,14): error TS2304: Cannot find name 'Icon'.
app/(e-comm)/client-invoice/[invoiceid]/page.tsx(21,11): error TS6196: 'Order' is declared but never used.
app/(e-comm)/client-invoice/[invoiceid]/page.tsx(48,9): error TS6133: 'status' is declared but its value is never read.
app/(e-comm)/components/ui/OptimizedCarousel.tsx(54,10): error TS6133: 'imagesLoaded' is declared but its value is never read.
app/(e-comm)/contact/action/contact.ts(15,3): error TS6133: 'prevState' is declared but its value is never read.
app/(e-comm)/contact/action/contact.ts(31,11): error TS6133: 'submission' is declared but its value is never read.
app/(e-comm)/homepage/actions/fetchMoreProducts.ts(65,13): error TS2741: Property 'slug' is missing in type '{ imageUrl: string; price: number; type: string; name: string; supplier: { name: string; id: string; type: string; }; id: string; size: string | null; details: string | null; published: boolean; outOfStock: boolean; }' but required in type 'Product'.
app/(e-comm)/homepage/component/OptimizedImage.tsx(63,19): error TS6133: 'e' is declared but its value is never read.
app/(e-comm)/homepage/component/ProducCategory copy.tsx(71,9): error TS6133: 'allCount' is declared but its value is never read.
app/(e-comm)/homepage/component/product/ProducCategory.tsx(177,9): error TS6133: 'allCount' is declared but its value is never read.
app/(e-comm)/homepage/component/product/ProductCard.tsx(75,3): error TS6133: 'index' is declared but its value is never read.
app/(e-comm)/product/[slug]/actions.ts(41,13): error TS6133: 'similarProducts' is declared but its value is never read.
app/(e-comm)/product/[slug]/page.tsx(77,9): error TS6133: 'isInWishlist' is declared but its value is never read.
app/(e-comm)/product/[slug]/page.tsx(149,30): error TS2322: Type '{ supplier: { name: string; id: string; slug: string; logo: string | null; email: string; phone: string; address: string; type: string; createdAt: Date; updatedAt: Date; }; reviews: { id: string; ... 6 more ...; isVerified: boolean; }[]; } & { ...; }' is not assignable to type 'Product'.
  Types of property 'imageUrl' are incompatible.
    Type 'string | null' is not assignable to type 'string'.
      Type 'null' is not assignable to type 'string'.
app/(e-comm)/user/profile/action/action.ts(2,1): error TS6133: 'auth' is declared but its value is never read.
app/(e-comm)/user/profile/action/update-user-profile.ts(5,41): error TS6133: 'prevState' is declared but its value is never read.
app/(e-comm)/user/profile/action/update-user-profile.ts(48,11): error TS6133: 'updatedUser' is declared but its value is never read.
app/(e-comm)/user/profile/component/update-profile.tsx(21,9): error TS6133: 'session' is declared but its value is never read.
app/(e-comm)/user/profile/component/update-profile.tsx(29,5): error TS6133: 'geoAccuracy' is declared but its value is never read.
app/(e-comm)/user/profile/page.tsx(7,1): error TS6133: 'auth' is declared but its value is never read.
app/(e-comm)/user/setting/action/changePasswod.ts(10,11): error TS6133: 'updateUser' is declared but its value is never read.
app/(e-comm)/user/statement/page.tsx(3,10): error TS6133: 'Download' is declared but its value is never read.
app/(e-comm)/user/statement/page.tsx(3,30): error TS6133: 'AlertCircle' is declared but its value is never read.
app/dashboard/clientnews/actions/newsletter.ts(3,1): error TS6133: 'PrismaClient' is declared but its value is never read.
app/dashboard/clientsubmission/component/RealTimeTable.tsx(2,10): error TS6133: 'useEffect' is declared but its value is never read.
app/dashboard/clientsubmission/component/RealTimeTable.tsx(15,1): error TS6133: 'Notification' is declared but its value is never read.
app/dashboard/clientsubmission/component/RealTimeTable.tsx(16,1): error TS6133: 'format' is declared but its value is never read.
app/dashboard/clientsubmission/component/RealTimeTable.tsx(17,1): error TS6133: 'ar' is declared but its value is never read.
app/dashboard/clientsubmission/component/RealTimeTable.tsx(38,23): error TS6133: 'setSubmissions' is declared but its value is never read.
app/dashboard/clientsubmission/component/RealTimeTable.tsx(40,10): error TS6133: 'notification' is declared but its value is never read.
app/dashboard/clientsubmission/component/RealTimeTable.tsx(40,24): error TS6133: 'setNotification' is declared but its value is never read.
app/dashboard/DashboardHomePage.tsx(130,41): error TS6133: 'entry' is declared but its value is never read.
app/dashboard/expenses/component/ExpenseListClient.tsx(9,1): error TS6133: 'toast' is declared but its value is never read.
app/dashboard/helpers/mainMenu.ts(4,3): error TS6133: 'Home' is declared but its value is never read.
app/dashboard/helpers/mainMenu.ts(18,3): error TS6133: 'ShieldCheck' is declared but its value is never read.
app/dashboard/helpers/mainMenu.ts(19,3): error TS6133: 'Building2' is declared but its value is never read.
app/dashboard/helpers/mainMenu.ts(20,3): error TS6133: 'FileCheck' is declared but its value is never read.
app/dashboard/helpers/mainMenu.ts(21,3): error TS6133: 'Eye' is declared but its value is never read.
app/dashboard/helpers/mainMenu.ts(23,3): error TS6133: 'Folder' is declared but its value is never read.
app/dashboard/helpers/mainMenu.ts(32,3): error TS6133: 'ThumbsUp' is declared but its value is never read.
app/dashboard/layout.tsx(18,9): error TS6133: 'defaultOpen' is declared but its value is never read.
app/dashboard/offer/actions/add-offer.ts(8,35): error TS6133: 'prevState' is declared but its value is never read.
app/dashboard/offer/actions/add-offer.ts(10,9): error TS6133: 'id' is declared but its value is never read.
app/dashboard/offer/actions/add-offer.ts(35,11): error TS6133: 'updateData' is declared but its value is never read.
app/dashboard/offer/actions/update-offer.ts(8,35): error TS6133: 'prevState' is declared but its value is never read.
app/dashboard/offer/actions/update-offer.ts(34,11): error TS6133: 'updateData' is declared but its value is never read.
app/dashboard/offer/components/AddOffer.tsx(11,3): error TS6133: 'ShoppingBasket' is declared but its value is never read.
app/dashboard/offer/components/AddOffer.tsx(29,1): error TS6133: 'FaAddressCard' is declared but its value is never read.
app/dashboard/offer/components/AddOffer.tsx(31,11): error TS6196: 'EditSupplierDialogProps' is declared but never used.
app/dashboard/offer/components/EditOffer.tsx(14,8): error TS6133: 'InputField' is declared but its value is never read.
app/dashboard/orders-mangment/component/pusherNotifaction/NotificationList.tsx(18,3): error TS6133: 'onMarkRead' is declared but its value is never read.
app/dashboard/orders-mangment/component/pusherNotifaction/NotificationList.tsx(20,3): error TS6133: 'isOpen' is declared but its value is never read.
app/dashboard/orders-mangment/component/pusherNotifaction/PusherNotify.tsx(25,1): error TS6133: 'notifcationMsg' is declared but its value is never read.
app/dashboard/orders-mangment/component/pusherNotifaction/PusherNotify.tsx(26,1): error TS6133: 'NotifyDialog' is declared but its value is never read.
app/dashboard/orders/action/NotifyDiaolg.tsx(45,10): error TS6133: 'unreadCount' is declared but its value is never read.
app/dashboard/orders/component/dashboard-sidebar.tsx(11,3): error TS6133: 'SidebarGroupLabel' is declared but its value is never read.
app/dashboard/orders/component/DashboardHeader.tsx(43,9): error TS6133: 'handleFilterChange' is declared but its value is never read.
app/dashboard/orders/component/OrderCard.tsx(72,78): error TS6133: 'orderNo' is declared but its value is never read.
app/dashboard/orders/component/pusherNotifaction/PusherNotify.tsx(25,1): error TS6133: 'notifcationMsg' is declared but its value is never read.
app/dashboard/orders/component/pusherNotifaction/PusherNotify.tsx(26,1): error TS6133: 'NotifyDialog' is declared but its value is never read.
app/dashboard/orders/helper/menuItem.ts(4,3): error TS6133: 'Drama' is declared but its value is never read.
app/dashboard/products-control/analytics/[id]/analytics-api.ts(27,47): error TS6133: 'idx' is declared but its value is never read.
app/dashboard/products-control/analytics/[id]/AnalyticsActions.tsx(28,10): error TS2304: Cannot find name 'Icon'.
app/dashboard/products-control/analytics/[id]/AnalyticsActions.tsx(32,10): error TS2304: Cannot find name 'Icon'.
app/dashboard/products-control/analytics/[id]/AnalyticsChart.tsx(29,32): error TS6133: 'entry' is declared but its value is never read.
app/dashboard/products-control/analytics/[id]/ClientAnalyticsActions.tsx(28,10): error TS2304: Cannot find name 'Icon'.
app/dashboard/products-control/analytics/[id]/ClientAnalyticsActions.tsx(32,10): error TS2304: Cannot find name 'Icon'.
app/dashboard/products-control/analytics/[id]/ClientAnalyticsDashboard.tsx(34,10): error TS6133: 'from' is declared but its value is never read.
app/dashboard/products-control/analytics/[id]/ClientAnalyticsDashboard.tsx(35,10): error TS6133: 'to' is declared but its value is never read.
app/dashboard/products-control/analytics/[id]/getAnalytics.ts(24,9): error TS6133: 'totalSalesAgg' is declared but its value is never read.
app/dashboard/products-control/analytics/[id]/getAnalytics.ts(61,47): error TS6133: 'idx' is declared but its value is never read.
app/dashboard/products-control/analytics/[id]/page.tsx(26,12): error TS2304: Cannot find name 'ArrowRight'.
app/dashboard/products-control/analytics/[id]/ProductOrderHistoryTable.tsx(54,9): error TS6133: 'pageTotal' is declared but its value is never read.
app/dashboard/products-control/components/ProductFilters.tsx(25,12): error TS2304: Cannot find name 'Icon'.
app/dashboard/products-control/components/ProductFilters.tsx(76,16): error TS2304: Cannot find name 'Icon'.
app/dashboard/products-control/components/ProductRowActions.tsx(9,10): error TS2304: Cannot find name 'Icon'.
app/dashboard/products-control/components/ProductsControlClient.tsx(23,10): error TS6133: 'selectedSupplierId' is declared but its value is never read.
app/dashboard/products-control/components/ProductsControlClient.tsx(23,30): error TS6133: 'setSelectedSupplierId' is declared but its value is never read.
app/dashboard/products-control/components/ProductsControlClient.tsx(24,10): error TS6133: 'supplierCount' is declared but its value is never read.
app/dashboard/products-control/components/ProductsControlClient.tsx(24,25): error TS6133: 'setSupplierCount' is declared but its value is never read.
app/dashboard/products-control/components/ProductsControlClient.tsx(101,9): error TS6133: 'handlePageSizeChange' is declared but its value is never read.
app/dashboard/products-control/components/ProductTable.tsx(31,40): error TS6133: 'page' is declared but its value is never read.
app/dashboard/products-control/components/ProductTable.tsx(31,66): error TS6133: 'total' is declared but its value is never read.
app/dashboard/products-control/components/ProductTableClientActions.tsx(41,10): error TS2304: Cannot find name 'Icon'.
app/dashboard/products-control/components/SupplierSelect.tsx(25,76): error TS6133: 'onAddSupplier' is declared but its value is never read.
app/dashboard/products-control/page.tsx(1,1): error TS6133: 'fetchProducts' is declared but its value is never read.
app/dashboard/products-control/page.tsx(4,51): error TS6133: 'props' is declared but its value is never read.
app/dashboard/products/actions/create-product.ts(11,37): error TS6133: 'prevState' is declared but its value is never read.
app/dashboard/products/actions/prepare-product-data.ts(7,53): error TS6133: 'imageFile' is declared but its value is never read.
app/dashboard/products/components/AddProductForm.tsx(7,1): error TS6133: 'TooltipProvider' is declared but its value is never read.
app/dashboard/products/components/AddProductForm.tsx(18,18): error TS6133: 'setErrors' is declared but its value is never read.
app/dashboard/products/components/UpdateProductForm.tsx(17,18): error TS6133: 'setErrors' is declared but its value is never read.
app/dashboard/products/itemdetail/[id]/actions/update-product.ts(12,37): error TS6133: 'prevState' is declared but its value is never read.
app/dashboard/products/itemdetail/[id]/actions/update-product.ts(48,11): error TS6133: 'updatedProduct' is declared but its value is never read.
app/dashboard/products/itemdetail/[id]/component/ProductHeader.tsx(15,68): error TS6133: 'children' is declared but its value is never read.
app/dashboard/products/itemdetail/[id]/component/ProductStatusControl.tsx(20,10): error TS6133: 'dialog' is declared but its value is never read.
app/dashboard/products/itemdetail/[id]/component/ProductStatusControl.tsx(32,26): error TS6133: 'action' is declared but its value is never read.
app/dashboard/products/porductmangment/components/ProductCard.tsx(54,9): error TS6133: 'handleEdit' is declared but its value is never read.
app/dashboard/products/porductmangment/components/ProductCard.tsx(55,9): error TS6133: 'handleDelete' is declared but its value is never read.
app/dashboard/products/porductmangment/components/ProductCard.tsx(56,9): error TS6133: 'handleMarkOutOfStock' is declared but its value is never read.
app/dashboard/products/porductmangment/components/ProductCard.tsx(58,9): error TS6133: 'handleSuspendItem' is declared but its value is never read.
app/dashboard/promotions/components/SliderImagesGallery.tsx(84,18): error TS2304: Cannot find name 'Eye'.
app/dashboard/reports/drivers/components/DriversReportTable.tsx(23,47): error TS6133: 'page' is declared but its value is never read.
app/dashboard/reports/finance/component/FinanceReportClient.tsx(38,24): error TS6133: 'label' is declared but its value is never read.
app/dashboard/reports/orders/component/OrderAnalyticsClient.tsx(133,41): error TS6133: 'entry' is declared but its value is never read.
app/dashboard/reports/product-performance/action/getProductPerformanceData.ts(6,7): error TS6133: 'dateFilter' is declared but its value is never read.
app/dashboard/reports/products/action/getProductPerformanceData.ts(1,1): error TS6133: 'db' is declared but its value is never read.
app/dashboard/reports/products/action/getProductPerformanceData.ts(3,49): error TS6198: All destructured elements are unused.
app/dashboard/reports/products/component/ProductPerformanceClient.tsx(3,50): error TS6198: All destructured elements are unused.
app/dashboard/setting/component/LocationSection.tsx(28,3): error TS6133: 'isGeolocationEnabled' is declared but its value is never read.
app/dashboard/setting/component/LocationSection.tsx(44,10): error TS6133: 'newlatitude' is declared but its value is never read.
app/dashboard/setting/component/LocationSection.tsx(44,23): error TS6133: 'setNewlatitude' is declared but its value is never read.
app/dashboard/setting/component/LocationSection.tsx(45,10): error TS6133: 'newlongitude' is declared but its value is never read.
app/dashboard/setting/component/LocationSection.tsx(45,24): error TS6133: 'setNewlongitude' is declared but its value is never read.
app/dashboard/setting/component/LocationSection.tsx(51,5): error TS6133: 'geoAccuracy' is declared but its value is never read.
app/dashboard/setting/component/LocationSection.tsx(55,5): error TS6133: 'getGoogleMapsLink' is declared but its value is never read.
app/dashboard/show-invoice/[invoiceid]/page.tsx(23,11): error TS6196: 'Order' is declared but never used.
app/dashboard/show-invoice/actions/approveOrder-toDtiver.ts(19,9): error TS6133: 'data' is declared but its value is never read.
app/dashboard/show-invoice/actions/sendInvoiceEmail copy.ts(47,11): error TS6133: 'info' is declared but its value is never read.
app/dashboard/show-invoice/actions/sendInvoiceEmail.ts(130,11): error TS6133: 'info' is declared but its value is never read.
app/dashboard/show-invoice/components/SendOrderViaEmail.tsx(22,17): error TS6133: 'setOrder' is declared but its value is never read.
app/dashboard/suppliers/actions/add-supplier.ts(8,38): error TS6133: 'prevState' is declared but its value is never read.
app/dashboard/suppliers/actions/add-supplier.ts(10,9): error TS6133: 'id' is declared but its value is never read.
app/dashboard/suppliers/actions/add-supplier.ts(34,11): error TS6133: 'updateData' is declared but its value is never read.
app/dashboard/suppliers/actions/update-supplier.ts(8,38): error TS6133: 'prevState' is declared but its value is never read.
app/dashboard/suppliers/components/AddSupplierDialog.tsx(23,11): error TS6196: 'EditSupplierDialogProps' is declared but never used.
app/dashboard/suppliers/components/AddSupplierDialog.tsx(58,12): error TS2304: Cannot find name 'Icon'.
app/dashboard/suppliers/components/AddSupplierDialog.tsx(96,14): error TS2304: Cannot find name 'Icon'.
app/dashboard/suppliers/components/AddSupplierDialog.tsx(115,12): error TS2304: Cannot find name 'Icon'.
app/dashboard/suppliers/components/AddSupplierDialog.tsx(121,83): error TS2304: Cannot find name 'Icon'.
app/dashboard/suppliers/components/EditSupplierDialog.tsx(14,8): error TS6133: 'InputField' is declared but its value is never read.
app/dashboard/users/viewuser/page.tsx(75,54): error TS6133: 'itemIndex' is declared but its value is never read.
app/driver/components/DriverHeader.tsx(18,3): error TS6133: 'orderCount' is declared but its value is never read.
app/driver/components/DriverHeader.tsx(24,3): error TS6133: 'onRefresh' is declared but its value is never read.
app/driver/driver/action/actions.ts(5,58): error TS6133: 'status' is declared but its value is never read.
app/driver/driver/action/actions.ts(210,9): error TS6133: 'changeStatus' is declared but its value is never read.
app/driver/driver/action/actions.ts(214,9): error TS6133: 'removeFromInWay' is declared but its value is never read.
app/driver/driver/action/actions.ts(220,9): error TS6133: 'changeStatus' is declared but its value is never read.
app/driver/driver/action/actions.ts(224,9): error TS6133: 'removeFromInWay' is declared but its value is never read.
app/driver/driver/action/startTrip.ts(40,11): error TS6133: 'updateOrder' is declared but its value is never read.
app/driver/driver/action/trackDriver.ts(24,11): error TS6133: 'updatedOrderHistorey' is declared but its value is never read.
app/driver/driver/component/CancelOrder.tsx(42,13): error TS6133: 'cancelJobOrder' is declared but its value is never read.
app/driver/driver/component/DeleverOrder.tsx(24,3): error TS6133: 'orderNumber' is declared but its value is never read.
app/driver/driver/component/DeleverOrder.tsx(33,11): error TS6133: 'cancelJobOrder' is declared but its value is never read.
app/driver/driver/component/DriverOrderCard.tsx(111,14): error TS6133: 'error' is declared but its value is never read.
app/driver/driver/component/StartTrip.tsx(35,13): error TS6133: 'result' is declared but its value is never read.
app/driver/driver/page.tsx(42,23): error TS6133: 'status' is declared but its value is never read.
app/seo/create/page.tsx(15,9): error TS6133: 'defaultEntityId' is declared but its value is never read.
components/ecomm/Fotter/ContactInfo.tsx(25,9): error TS6133: 'hasMapData' is declared but its value is never read.
components/ecomm/Header/ThemeToggle.tsx(17,10): error TS2304: Cannot find name 'Icon'.
components/ecomm/Header/ThemeToggle.tsx(19,10): error TS2304: Cannot find name 'Icon'.
components/GoogleMap.tsx(20,43): error TS6133: 'zoom' is declared but its value is never read.
components/image-upload.tsx(188,57): error TS6133: 'error' is declared but its value is never read.
components/image-upload.tsx(279,3): error TS6133: 'showInstruction' is declared but its value is never read.
components/image-upload.tsx(341,22): error TS6133: 'rejectedFiles' is declared but its value is never read.
components/image-upload.tsx(359,9): error TS6133: 'handleRefresh' is declared but its value is never read.
components/ThemeToggle.tsx(4,1): error TS6133: 'UI_TEXT' is declared but its value is never read.
components/ui/accordion.tsx(36,8): error TS2304: Cannot find name 'Icon'.
components/ui/dropdown-menu.tsx(36,6): error TS2304: Cannot find name 'Icon'.
components/ui/dropdown-menu.tsx(110,10): error TS2304: Cannot find name 'Icon'.
components/ui/dropdown-menu.tsx(133,10): error TS2304: Cannot find name 'Icon'.
components/ui/input-otp.tsx(69,6): error TS2304: Cannot find name 'Icon'.
components/ui/pagination.tsx(75,6): error TS2304: Cannot find name 'Icon'.
components/ui/pagination.tsx(93,6): error TS2304: Cannot find name 'Icon'.
components/ui/pagination.tsx(107,6): error TS2304: Cannot find name 'Icon'.
components/ui/select.tsx(28,8): error TS2304: Cannot find name 'Icon'.
components/ui/select.tsx(46,6): error TS2304: Cannot find name 'Icon'.
components/ui/select.tsx(63,6): error TS2304: Cannot find name 'Icon'.
components/ui/select.tsx(127,10): error TS2304: Cannot find name 'Icon'.
lib/uploadImageToCloudinary copy 2.ts(84,10): error TS6133: 'isValidImageFile' is declared but its value is never read.
 ELIFECYCLE  Command failed with exit code 1.
<environment_details>
# VSCode Visible Files
(No visible files)

# VSCode Open Tabs
(No open tabs)

# Current Time
5/11/2025, 7:02:30 PM (Asia/Riyadh, UTC+3:00)

# Context Window Usage
833,962 / 1,048.576K tokens used (80%)

# Current Mode
ACT MODE
</environment_details>
