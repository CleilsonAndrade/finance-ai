import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex justify-between">
      <div className="flex items-center gap-10">
        <Image src="/logo.svg" width={173} height={39} alt="Finance AI" />
        <Link href="/">Dashboard</Link>
        <Link href="/transactions">Transações</Link>
        <Link href="/subscription">Assinatura</Link>
      </div>
    </nav>
  );
}
