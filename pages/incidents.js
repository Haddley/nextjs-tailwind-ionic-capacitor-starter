import dynamic from 'next/dynamic';

const App = dynamic(() => import('../components/IncidentsComponent'), {
  ssr: false,
});

export default function Index() {
  return <App />;
}
