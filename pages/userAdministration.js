import dynamic from 'next/dynamic';

const App = dynamic(() => import('../components/UserAdministrationComponent'), {
  ssr: false,
});

export default function Index() {
  return <App />;
}
