/* PARKED: /join is deferred (content unwritten); auth moved into the storefront kit as phone+OTP. */
const { EmptyState, Button } = window.TrendDesignSystem_7e8edd;
function App(){ return <div style={{minHeight:'100vh',display:'flex',alignItems:'center',justifyContent:'center',padding:24}}><EmptyState icon="construction" title="/join — deferred" description="The seller landing page has no written content yet. Auth moved into the storefront kit as phone + OTP." action={<Button variant="outline" onClick={()=>location.href='../storefront/index.html'}>Open storefront kit</Button>}/></div>; }
ReactDOM.createRoot(document.getElementById('root')).render(<App />);
