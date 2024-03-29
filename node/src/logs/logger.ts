import chalk from "chalk";

class Logger {
  static error(...messages: any[]) {
    console.error(chalk.red(...messages));
  }

  static info(...messages: any[]) {
    if (process.env.NODE_ENV === "prod") return;
    console.log(chalk.yellow(...messages));
  }

  static debug(...messages: any[]) {
    console.debug(chalk.blue(...messages));
  }

  static verbose(...messages: any[]) {
    if (process.env.NODE_ENV === "prod") return;
    console.log(chalk.magenta(...messages));
  }

  static warn(...messages: any[]) {
    console.warn(chalk.yellow(...messages));
  }

  static log(...messages: any[]) {
    if (process.env.NODE_ENV === "prod") return;
    console.log(...messages);
  }
}

export { Logger };
