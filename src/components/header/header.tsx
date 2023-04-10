import React, { FormEventHandler, useEffect, useMemo, useState } from "react";
import { useCss, k } from "kremling";

import { Button } from "../../common/button/button";
import logo from "../../assets/logo.svg?raw";
import { Menu, MenuItem } from "../../common/menu";
import { ThemeToggle } from "../theme-toggle/theme-toggle";
import { Icon } from "../../common/icon/icon";
import { Input } from "../../common/input/input";
import { MenuTitle } from "../../common/menu/menu-title";
import { appState, useAppState } from "../../app-state";

type SearchProps = {
  handleSearch: (query: string) => void;
};

export function Header(props: SearchProps) {
  const { handleSearch } = props;
  const scope = useCss(css);
  const [search, setSearch] = useState("");
  const [lastSearch, setLastSearch] = useState("");
  const { theme } = useAppState(["theme"]);

  const readyForNewSearch = useMemo(() => {
    return search !== lastSearch;
  }, [search, lastSearch]);

  const formSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    handleSearch(search);
    setLastSearch(search);
  };

  // useEffect(() => {
  //   handleSearch("test");
  // }, []);
  return (
    <div {...scope} className="header">
      <div>
        <Menu
          renderTrigger={(refProps, { open }) => (
            <Button {...refProps} active={open}>
              <div className="header-logo">octo</div>
            </Button>
          )}
        >
          <MenuTitle>Theme</MenuTitle>
          <MenuItem
            label="Light"
            active={theme === "light"}
            onClick={() => appState.set({ theme: "light" })}
          />
          <MenuItem
            label="Dark"
            active={theme === "dark"}
            onClick={() => appState.set({ theme: "dark" })}
          />
        </Menu>
      </div>
      <div className="header-nav">
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
      <div className="header-search">
        <form onSubmit={formSubmit}>
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
      <div>
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
    height: 5.7rem;
    padding-left: 1.6rem;
    padding-right: 1.6rem;
    display: flex;
    align-items: center;
    flex-direction: row;
    border-bottom: solid .1rem var(--app-border);
    gap: 1.6rem;
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
