import React, { useState } from "react";
import { useCss, k } from "kremling";

import { Modal } from "../../common/modal/modal";
import { Button } from "../../common/button/button";
import logo from "../../assets/logo.svg?raw";
import { Menu, MenuItem } from "../../common/menu";
import { ThemeToggle } from "../theme-toggle/theme-toggle";
import { ModalHeader } from "../../common/modal/modal-header";
import { ModalBody } from "../../common/modal/modal-body";
import { ModalFooter } from "../../common/modal/modal-footer";
import { Input } from "../../common/input/input";
import { send } from "../../messenger";
import { modalService } from "../../common/modal-service/modal-service";
import { CreateProjectModal } from "./create-project-modal";

export function Header() {
  const scope = useCss(css);

  const createProject = async () => {
    const res = await modalService.render(CreateProjectModal);
    console.log(res);
  };

  return (
    <div {...scope} className="header">
      <div className="no-drag">
        <Menu
          renderTrigger={(refProps) => (
            <div
              className="logo"
              dangerouslySetInnerHTML={{ __html: logo }}
              {...refProps}
            ></div>
          )}
        >
          <MenuItem label="Hey" />
        </Menu>
      </div>
      <div className="no-drag">
        <Button intent="primary" onClick={() => createProject()}>
          + Create your first project
        </Button>
      </div>
      <div className="no-drag">
        <ThemeToggle />
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
    padding-left: 10rem;
    display: flex;
    align-items: center;
    flex-direction: row;
    border-bottom: solid .1rem var(--app-border);
  }
  
  .no-drag {
    -webkit-app-region: none;
  }
  
  .logo {
    width: 3.6rem;
    fill: var(--logo-fill);
    margin-right: 2.4rem;
  }
`;
