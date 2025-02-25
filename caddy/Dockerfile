# not using alpine to include additional plugins like rate-limiter
FROM caddy:2-builder AS builder

RUN xcaddy build \
    --with github.com/mholt/caddy-ratelimit


FROM caddy:2-alpine

COPY Caddyfile /etc/caddy/Caddyfile

# contents from builder
COPY --from=builder /usr/bin/caddy /usr/bin/caddy