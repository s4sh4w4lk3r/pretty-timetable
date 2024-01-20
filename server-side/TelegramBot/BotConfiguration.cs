namespace TelegramBot
{
    public class BotConfiguration
    {
        public required string BotToken { get; init; }
        public required string WebhookSecretToken { get; init; }
        public required string WebhookUrl { get; init; }
    }
}
