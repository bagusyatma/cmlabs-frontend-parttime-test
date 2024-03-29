import Image from 'next/image';
import { useRouter } from 'next/router';

export default function Header() {
  const router = useRouter();
  return (
    <div className="container m-auto" style={{ borderBottom: '1px solid #F9D4BF' }}>
      <div className="flex flex-row items-center justify-between p-4">
        <div className="flex flex-row items-center cursor-pointer" onClick={() => router.push('/')}>
          <Image src="/logo.png" width={56} height={56} alt="mealapar-logo" />
          <div className="ml-2 text-2xl font-bold">Mealapar!</div>
        </div>
      </div>
    </div>
  );
}
