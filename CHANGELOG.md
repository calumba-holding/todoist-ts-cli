# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.0] - 2026-01-08

### Added

- Initial public release
- Built on official `@doist/todoist-api-typescript` SDK
- Task commands: today, tasks, add, done, reopen, view, update, move, delete, search
- Project commands: projects, project-add
- Section commands: sections, section-add
- Label commands: labels, label-add
- Comment commands: comments, comment
- JSON output support (`--json` flag)
- Color control (`--no-color` flag, `NO_COLOR` env var)
- Environment variable auth (`TODOIST_API_TOKEN`)
- Proper exit codes (0=success, 1=failure, 2=invalid usage, 3=auth failure)

### Notes

This is the first public release. Uses the official Todoist TypeScript SDK.
