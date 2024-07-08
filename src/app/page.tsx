"use client";

import {usePathname, useSearchParams, useRouter} from "next/navigation";

export default function Home() {
    const [searchName, setSearchName] = useSearchName();

    return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
          <input
              type="text"
              placeholder="Serach name..."
              className={"bg-transparent border-blue-500 border-2 rounded p-1 w-full"}
              value={searchName}
              onChange={(e) =>
              {
                  e.preventDefault();
                  setSearchName(e.target.value)
              }
          }/>
      </div>
    </main>
  );
}

export function useSearchName(): [string, (value: string) => void] {
    const [value, setValue] = useSearchParamByString(
        "search-name",
        "",
    );

    return [value, setValue];
}



function useSearchParamByString(
    key: string,
    defaultValue: string,
): [string, (value: string) => void] {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const router = useRouter();

    const setSearchParam = (value: string) => {
        const params = new URLSearchParams(searchParams);
        params.set(key, value);

        router.replace(`${pathname}?${params.toString()}`);
    };

    const searchParamValue = searchParams.get(key);

    if (searchParamValue !== null) {
        return [searchParamValue, setSearchParam];
    }

    return [defaultValue, setSearchParam];
}
