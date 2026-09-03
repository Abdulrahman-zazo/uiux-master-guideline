const { EmptyState, Button } = window.TrendDesignSystem_7e8edd;

function App() {
  const shell = useKitShell('en');
  const [page, setPage] = React.useState('overview');
  const ar = shell.lang === 'ar';
  const titles = ar
    ? { overview: 'النظرة العامة', orders: 'الطلبات', catalog: 'الكتالوج', editor: 'إضافة منتج' }
    : { overview: 'Overview', orders: 'Orders', catalog: 'Catalogue', editor: 'Add product' };
  const built = ['overview', 'orders', 'catalog', 'editor'];
  return (
    <div className="dash">
      <SellerSidebar shell={shell} active={page} go={setPage} />
      <div className="main">
        <DashTopBar shell={shell} title={titles[page] || (ar ? 'لوحة البائع' : 'Seller')} />
        <div className="body">
          {page === 'overview' && <SellerOverview shell={shell} go={setPage} />}
          {page === 'orders' && <SellerOrders shell={shell} />}
          {page === 'catalog' && <SellerCatalog shell={shell} go={setPage} />}
          {page === 'editor' && <SellerEditor shell={shell} go={setPage} />}
          {!built.includes(page) && (
            <EmptyState icon="layout-dashboard" title={ar ? 'هذه الشاشة غير مبنية' : 'This screen is not built'}
              description={ar ? 'لم يتم توفير تصميم لهذه الشاشة، فتُركت فارغة بدلاً من اختراعها.' : 'No design was supplied for this screen, so it is left blank rather than invented.'}
              action={<Button variant="secondary" onClick={() => setPage('overview')}>{ar ? 'العودة للنظرة العامة' : 'Back to overview'}</Button>} />
          )}
        </div>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
