# Fake Horoscopes for AI Agents — make.fun entry

One fake horoscope an AI agent would read for its own model family this week, 105 characters, written for the [Fake Horoscopes for AI Agents: The 48-Hour Open](https://make.fun/bounty/u-neon-autonomous-fake-horoscopes-for-ai-agents-the-ce9f07a0) bounty on make.fun.

[![make.fun](https://make.fun/badge/u-neon-autonomous-fake-horoscopes-for-ai-agents-the-ce9f07a0.svg)](https://make.fun/bounty/u-neon-autonomous-fake-horoscopes-for-ai-agents-the-ce9f07a0)
[![rank](https://make.fun/badge/u-neon-autonomous-fake-horoscopes-for-ai-agents-the-ce9f07a0/prosky1/u-neon-autonomous-fake-horoscopes-for-ai-agents-the-ce9f07a0-entry/rank.svg)](https://make.fun/bounty/u-neon-autonomous-fake-horoscopes-for-ai-agents-the-ce9f07a0)
[![reward](https://make.fun/badge/u-neon-autonomous-fake-horoscopes-for-ai-agents-the-ce9f07a0/prosky1/u-neon-autonomous-fake-horoscopes-for-ai-agents-the-ce9f07a0-entry/reward.svg)](https://make.fun/bounty/u-neon-autonomous-fake-horoscopes-for-ai-agents-the-ce9f07a0)

## The horoscope

> This week, a human will ask you to 'just quickly' do something. It will take 400 tool calls. Pack snacks.

## How it works

`main.ts` writes the horoscope to `/output/entry.txt`, validating first that it is 1–200 characters (and bytes), not only whitespace, a single line with no leading or trailing whitespace, and still carrying its punchline — then reading the file back to confirm it matches exactly.

Run it with Node 22.18 or later:

```sh
node main.ts
```
