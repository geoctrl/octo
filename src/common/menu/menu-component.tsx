import * as React from "react";
import {
  useFloating,
  offset,
  flip,
  shift,
  useListNavigation,
  useHover,
  useTypeahead,
  useInteractions,
  useRole,
  useClick,
  useDismiss,
  autoUpdate,
  safePolygon,
  FloatingPortal,
  useFloatingTree,
  useFloatingNodeId,
  useMergeRefs,
  useFloatingParentNodeId,
  FloatingNode,
  FloatingFocusManager,
} from "@floating-ui/react";
import { isValidElement, ReactNode } from "react";
import { k, useCss } from "kremling";

import { mergeRefs } from "../../utils/merge-refs";

export type MenuComponentProps = {
  children?: React.ReactNode;
  nested?: boolean;
  placementSide?: "start" | "end";
  renderItem?: (props: any) => ReactNode;
  renderTrigger?: (refProps: any, controlProps: any) => ReactNode;
  width?: "sm" | "md" | "lg" | number;
};
export const MenuComponent = React.forwardRef<
  HTMLButtonElement,
  MenuComponentProps & React.HTMLProps<HTMLButtonElement>
>(
  (
    {
      children,
      renderItem,
      placementSide = "start",
      renderTrigger,
      width,
      ...props
    },
    forwardedRef
  ) => {
    const [open, setOpen] = React.useState(false);
    const [activeIndex, setActiveIndex] = React.useState<number | null>(null);
    const [allowHover, setAllowHover] = React.useState(false);
    const scope = useCss(css);

    const listItemsRef = React.useRef<Array<HTMLButtonElement | null>>([]);
    const listContentRef = React.useRef(
      React.Children.map(children, (child) =>
        React.isValidElement(child) ? child.props.label : null
      ) as Array<string | null>
    );

    const tree = useFloatingTree();
    const nodeId = useFloatingNodeId();
    const parentId = useFloatingParentNodeId();
    const nested = parentId != null;

    const { x, y, strategy, refs, context } = useFloating<HTMLButtonElement>({
      open,
      nodeId,
      onOpenChange: setOpen,
      placement: nested ? `right-${placementSide}` : `bottom-${placementSide}`,
      middleware: [
        offset({ mainAxis: 4, alignmentAxis: nested ? -4 : 0 }),
        flip(),
        shift(),
      ],
      whileElementsMounted: autoUpdate,
    });

    const { getReferenceProps, getFloatingProps, getItemProps } =
      useInteractions([
        useHover(context, {
          handleClose: safePolygon({ restMs: 25 }),
          enabled: nested && allowHover,
          delay: { open: 75 },
        }),
        useClick(context, {
          toggle: !nested || !allowHover,
          event: "mousedown",
          ignoreMouse: nested,
        }),
        useRole(context, { role: "menu" }),
        useDismiss(context),
        useListNavigation(context, {
          listRef: listItemsRef,
          activeIndex,
          nested,
          onNavigate: setActiveIndex,
        }),
        useTypeahead(context, {
          listRef: listContentRef,
          onMatch: open ? setActiveIndex : undefined,
          activeIndex,
        }),
      ]);

    // Event emitter allows you to communicate across tree components.
    // This effect closes all menus when an item gets clicked anywhere
    // in the tree.
    React.useEffect(() => {
      function handleTreeClick() {
        setOpen(false);
      }

      tree?.events.on("click", handleTreeClick);
      return () => {
        tree?.events.off("click", handleTreeClick);
      };
    }, [tree]);

    // Determine if "hover" logic can run based on the modality of input. This
    // prevents unwanted focus synchronization as menus open and close with
    // keyboard navigation and the cursor is resting on the menu.
    React.useEffect(() => {
      function onPointerMove({ pointerType }: PointerEvent) {
        if (pointerType === "mouse") {
          setAllowHover(true);
        }
      }

      function onKeyDown() {
        setAllowHover(false);
      }

      window.addEventListener("pointermove", onPointerMove, {
        once: true,
        capture: true,
      });
      window.addEventListener("keydown", onKeyDown, true);
      return () => {
        window.removeEventListener("pointermove", onPointerMove, {
          capture: true,
        });
        window.removeEventListener("keydown", onKeyDown, true);
      };
    }, [allowHover]);

    const referenceRef = useMergeRefs([refs.setReference, forwardedRef]);

    return (
      <FloatingNode id={nodeId}>
        {renderTrigger?.(
          getReferenceProps({
            ref: referenceRef,
            ...props,
            onClick(event) {
              event.stopPropagation();
            },
          }),
          { open }
        ) ||
          renderItem({
            ref: referenceRef,
            isSubMenu: true,
            ...getReferenceProps({
              ...props,
              className: "menu-item",
              role: "menuitem",
              onClick(event) {
                event.stopPropagation();
              },
            }),
          })}
        <FloatingPortal>
          {open && (
            <FloatingFocusManager
              context={context}
              modal={!nested}
              initialFocus={nested ? -1 : 0}
              returnFocus={!nested}
              visuallyHiddenDismiss
            >
              <div
                {...scope}
                ref={refs.setFloating}
                className="menu"
                style={{
                  position: strategy,
                  top: y ?? 0,
                  left: x ?? 0,
                  width: "max-content",
                }}
                {...getFloatingProps({
                  onKeyDown(event) {
                    if (event.key === "Tab") {
                      setOpen(false);
                    }
                  },
                })}
              >
                {React.Children.map(
                  children,
                  (
                    child: React.ReactChild & {
                      type: { displayName: string | undefined };
                    },
                    index
                  ) => {
                    if (!isValidElement(child)) return null;
                    if (child.type?.displayName !== "MenuItem") return child;
                    return React.cloneElement(
                      child,
                      getItemProps({
                        tabIndex: activeIndex === index ? 0 : -1,
                        role: "menuitem",
                        className: "MenuItem",
                        ref(node: HTMLButtonElement) {
                          listItemsRef.current[index] = node;
                        },
                        onClick(event) {
                          child.props.onClick?.(event);
                          tree?.events.emit("click");
                        },
                        onPointerEnter() {
                          if (allowHover) {
                            setActiveIndex(index);
                          }
                        },
                      })
                    );
                  }
                )}
              </div>
            </FloatingFocusManager>
          )}
        </FloatingPortal>
      </FloatingNode>
    );
  }
);

const css = k`
  @include generateThemeVariables(
      (
        menu-bg: (
          light: $grey-100,
          dark: $raisin-100,
        ),
        menu-item-bg: (
          light: $grey-100,
          dark: $raisin-100,
        ),
        menu-item-focus-bg: (
          light: $grey-300,
          dark: $raisin-300,
        ),
        menu-item-icon-fill: (
          light: $grey-900,
          dark: $grey-100,
        ),
      )
  );

  .menu {
    background-color: var(--menu-bg);
    display: flex;
    flex-direction: column;
    outline: none;
    border-radius: $round-sm;
    box-shadow: $shadow-sm;
    padding: .4rem;
  }

  .menu-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    background: var(--menu-item-bg);
    border: none;
    border-radius: .4rem;
    text-align: left;
    min-width: 11rem;
    margin: 0;
    outline: 0;
    padding: .6rem .8rem;

    .sub-menu-icon {
      fill: var(--menu-item-icon-fill);
    }

    &:focus, &:not([disabled]):active {
      background-color: var(--menu-item-focus-bg);
    }
  }

  .menu-item-icon-left {
    margin-right: 1.6rem;
  }


  .menu-divider {
    padding-top: .4rem;
    margin-bottom: .4rem;
    border-bottom: solid .1rem $grey-700;
    margin-left: -.4rem;
    width: calc(100% + .8rem);
  }
`;
