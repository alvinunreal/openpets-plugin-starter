const DEFAULT_GREETING = "Hello from my first OpenPets plugin!";
const MAX_MESSAGE_LENGTH = 120;

function cleanMessage(value) {
  if (typeof value !== "string") return DEFAULT_GREETING;

  const cleaned = value
    .replace(/[\r\n]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, MAX_MESSAGE_LENGTH)
    .trim();

  return cleaned || DEFAULT_GREETING;
}

export function register(OpenPetsPlugin) {
  OpenPetsPlugin.register({
    async start(ctx) {
      const config = await ctx.config.get();
      const greeting = cleanMessage(config.greeting);

      await ctx.status.set({ text: ctx.t("status.ready"), tone: "success" });

      if (config.reactOnStart !== false) {
        await ctx.pet.react("waving");
      }

      await ctx.commands.register(
        {
          id: "say-hello",
          title: ctx.t("commands.sayHello.title"),
          description: ctx.t("commands.sayHello.description"),
        },
        async () => {
          await ctx.pet.speak(greeting);
          await ctx.pet.react("waving");
          await ctx.status.set({ text: ctx.t("status.greeted"), tone: "info" });
        },
      );
    },

    async stop(ctx) {
      await ctx?.status?.clear?.();
    },
  });
}

if (typeof globalThis.OpenPetsPlugin !== "undefined") {
  register(globalThis.OpenPetsPlugin);
}
