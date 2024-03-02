module.exports = {
  apps: [
    {
      name: "app-what-sender",
      script: "./app.js",
      watch: false,
      max_memory_restart: "1000M",
      exec_mode: "cluster",
      instances: 1,
      cron_restart: "59 23 * * *",
    },
  ],
};
