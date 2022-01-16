import dynamic from 'next/dynamic';

const App = dynamic(() => import('../components/HomeComponent'), {
  ssr: false,
});

export default function Index() {
  return <App />;
}
