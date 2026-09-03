const { EmptyState, Button } = window.TrendDesignSystem_7e8edd;

function App() {
  const shell = useKitShell('en');
  const [page, setPage] = React.useState('overview');
  const ar = shell.lang === 'ar';
  const titles = ar
    ? { overview: 'نظرة عامة على المنصة', sellers: 'البائعون', moderation: 'قائمة المراجعة', customers: 'العملاء' }
    : { overview: 'Platform overview', sellers: 'Sellers', moderation: 'Moderation queue', customers: 'Customers' };
  const built = ['overview', 'sellers', 'moderation', 'customers'];
  return (
    <div className="dash">
      <AdminSidebar shell={shell} active={page} go={setPage} />
      <div className="main">
        <AdminTopBar shell={shell} title={titles[page] || (ar ? 'لوحة المشرف' : 'Admin')} />
        <div className="body">
          {page === 'overview' && <AdminOverview shell={shell} go={setPage} />}
          {page === 'sellers' && <AdminSellers shell={shell} />}
          {page === 'moderation' && <AdminModeration shell={shell} />}
          {page === 'customers' && <AdminCustomers shell={shell} />}
          {!built.includes(page) && (
            <EmptyState icon="shield-check" title={ar ? 'هذه الشاشة غير مبنية' : 'This screen is not built'}
              description={ar ? 'لم يتم توفير تصميم لهذه الشاشة، فتُركت فارغة بدلاً من اختراعها.' : 'No design was supplied for this screen, so it is left blank rather than invented.'}
              action={<Button variant="secondary" onClick={() => setPage('overview')}>{ar ? 'العودة' : 'Back to overview'}</Button>} />
          )}
        </div>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
