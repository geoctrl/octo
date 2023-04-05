import React, { useEffect, useMemo, useState } from "react";
import { useCss, k } from "kremling";

import { Button } from "../../common/button/button";
import logo from "../../assets/logo.svg?raw";
import { Menu, MenuItem } from "../../common/menu";
import { ThemeToggle } from "../theme-toggle/theme-toggle";
import { Icon } from "../../common/icon/icon";
import { Input } from "../../common/input/input";

export function Header() {
  const scope = useCss(css);
  const [search, setSearch] = useState("");
  const [lastSearch, setLastSearch] = useState("");

  const readyForNewSearch = useMemo(() => {
    return search !== lastSearch;
  }, [search, lastSearch]);

  return (
    <div {...scope} className="header">
      <div className="no-drag">
        <Menu
          renderTrigger={(refProps, { open }) => (
            <Button {...refProps} active={open}>
              <div className="header-logo">octo</div>
            </Button>
          )}
        >
          <MenuItem label="Settings" />
        </Menu>
      </div>
      <div className="no-drag header-nav">
        <Menu
          renderTrigger={(refProps, { open }) => (
            <Button intent="secondary-grey" active={open} {...refProps}>
              Front-end
            </Button>
          )}
        >
          <MenuItem label="Front-end" />
        </Menu>
        <Icon name="angle-right-regular" />
        <Menu
          renderTrigger={(refProps, { open }) => (
            <Button intent="secondary-grey" active={open} {...refProps}>
              All
            </Button>
          )}
        >
          <MenuItem label="All" />
        </Menu>
      </div>
      <div className="no-drag header-search">
        <form>
          <Input
            iconLeft="magnifying-glass-regular"
            value={search}
            onChange={setSearch}
            buttonRight={
              <Button intent={readyForNewSearch ? "primary" : "secondary-grey"}>
                Search
              </Button>
            }
          />
        </form>
      </div>
      <div className="no-drag">
        <Menu
          renderTrigger={(refProps, { open }) => (
            <Button intent="secondary-grey" {...refProps} active={open}>
              Plain text
            </Button>
          )}
        >
          <MenuItem label="Plain text" />
        </Menu>
      </div>
    </div>
  );
}

Header.propTypes = {};

const css = k`
  @include generateThemeVariables((
    logo-fill: (
      light: $raisin-900,
      dark: $grey-100,
    ),
  ));

  .header {
    -webkit-app-region: drag;
    height: 5.7rem;
    padding-left: 9rem;
    padding-right: 1.6rem;
    display: flex;
    align-items: center;
    flex-direction: row;
    border-bottom: solid .1rem var(--app-border);
    gap: 1.6rem;
  }
  
  .no-drag {
    -webkit-app-region: none;
  }
  
  .header-logo {
    font-weight: 700;
    font-size: 2rem;
  }
  
  .header-nav {
    display: flex;
    align-items: center;
    gap: .8rem;
  }
  
  .header-search {
    flex-grow: 1;
  }
`;
