import { ReactNode } from "react";
import clsx from "clsx";

export function Table({ headers, children }: { headers: string[]; children: ReactNode }) {
  return (
    <div className="overflow-x-auto rounded-xl2 border border-borderc">
      <table className="w-full text-left text-sm">
        <thead className="bg-navy text-white">
          <tr>
            {headers.map((h) => (
              <th key={h} className="px-4 py-3 font-semibold">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-borderc bg-white">{children}</tbody>
      </table>
    </div>
  );
}

export function Td({ children, className }: { children: ReactNode; className?: string }) {
  return <td className={clsx("px-4 py-3 align-middle", className)}>{children}</td>;
}
