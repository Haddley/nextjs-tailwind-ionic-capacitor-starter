import dynamic from 'next/dynamic';

const App = dynamic(() => import('../components/IncidentRegisterComponent'), {
  ssr: false,
});

export default function Index() {
  return <App />;
}
