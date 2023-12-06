"use client";

import {
  KBarProvider,
  KBarPortal,
  KBarPositioner,
  KBarAnimator,
  KBarSearch,
  useMatches,
  KBarResults,
  ActionImpl,
} from "kbar";

import { useRouter } from "next/navigation";
import { Ref, forwardRef } from "react";

const KBar = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const actions = [
    {
      id: "blog",
      name: "Blog",
      shortcut: ["b"],
      keywords: "blog posts",
      perform: () => router.push("blog"),
    },
    {
      id: "contact",
      name: "Contact",
      shortcut: ["c"],
      keywords: "email",
      perform: () => router.push("contact"),
    },
  ];
  return (
    <>
      <KBarProvider actions={actions}>
        <KBarPortal>
          <KBarPositioner>
            <KBarAnimator className={"max-w-2xl w-full rounded-lg shadow-lg"}>
              <KBarSearch className={'py-4 rounded-t-lg px-8 w-full outline-none text-sm box-border-none'} />
              <RenderResults />
            </KBarAnimator>
          </KBarPositioner>
        </KBarPortal>
        {children}
      </KBarProvider>
    </>
  );
};

const RenderResults = () => {
  const { results } = useMatches();

  return (
    <KBarResults
      items={results}
      onRender={({ item, active }) => {
        if (typeof item === "string") {
          return <div>{item}</div>;
        } else {
          return <RenderItem action={item} active={active} />;
        }
      }}
    />
  );
};

const RenderItem = forwardRef(function RenderItem(
  { action, active }: { action: ActionImpl; active: boolean },
  ref: Ref<HTMLDivElement>
) {
  return (
    <div
      ref={ref}
      className={`${
        active ? "bg-white border-l-black border-l-4" : "bg-gray-200"
      } px-3 py-4 text-slate-800 leading-none font-medium flex items-center justify-between cursor-pointer`}
    >
      <h1 className="text-md">{action.name}</h1>
      <div className={`rounded flex justify-between items-center`}>
        {action.shortcut?.length ? (
          <div
            aria-hidden
            style={{ display: "grid", gridAutoFlow: "column", gap: "4px" }}
          >
            {action.shortcut.map((sc) => (
              <kbd
                key={sc}
                className={"bg-gray-300 px-2 py-2 rounded-md text-sm"}
              >{sc}</kbd>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
});

export default KBar;
