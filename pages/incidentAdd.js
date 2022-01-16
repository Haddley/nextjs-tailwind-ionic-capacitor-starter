import dynamic from 'next/dynamic';

const App = dynamic(() => import('../components/IncidentAddComponent'), {
  ssr: false,
});

export default function Index() {
  return <App />;
}
