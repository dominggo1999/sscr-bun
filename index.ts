#!/usr/bin/env bun

import styles from "ansi-styles";

const commandColor = (string: string) => {
  return `${styles.redBright.open}${string}${styles.redBright.close}`;
};

const sscr = async () => {
  const { argv } = process;

  let query = argv.slice(2);

  try {
    const packageJSON = await Bun.file("package.json").json();

    const scripts: Record<string, string> = packageJSON.scripts;

    if (!scripts) {
      console.log("There is no scripts in package.json");
      return;
    }

    Object.keys(scripts).map((key) => {
      const cmd = scripts[key];

      console.log(`${key} : "${commandColor(cmd)}"`);
    });
  } catch (error) {
    console.log("package.json not found");
    return;
  }
};

sscr();
