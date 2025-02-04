import chalk from "chalk";

const Logger = {
	success: (title, message) => {
		console.log(
			chalk.bold.cyan(`[${title}]`) +
				chalk.grey(" > ") +
				chalk.bold.green(message)
		);
		return;
	},

	warn: (title, message) => {
		console.warn(
			chalk.bold.yellow(`[${title}]`) +
				chalk.grey(" > ") +
				chalk.bold.yellow(message)
		);
		return;
	},

	info: (title, message) => {
		console.log(
			chalk.bold.cyan(`[${title}]`) +
				chalk.grey(" > ") +
				chalk.bold.white(message)
		);
		return;
	},

	debug: (title, message) => {
		if (!process.env.DEBUG_FLAG || process.env.DEBUG_FLAG !== "yes") {
			return;
		}
		console.log(
			chalk.bold.magenta(`[Debug - ${title}]`) +
				chalk.grey(" > ") +
				chalk.bold.white(message)
		);
		return;
	},

	error: (title, message, error) => {
		console.error(
			chalk.bold.red(`[${title}]`) +
				chalk.grey(" > ") +
				chalk.bold.red(message)
		);

		if (error instanceof Error && error.stack) {
			console.log(chalk.grey("[=========BEGIN=========]"));
			console.error(chalk.bold.red(error.stack));
			console.log(chalk.grey("[=========END==========]"));
		}

		return;
	},
};

export default Logger;
