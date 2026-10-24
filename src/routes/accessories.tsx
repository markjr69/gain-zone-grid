import { createFileRoute, redirect } from '@tanstack/react-router';
export const Route = createFileRoute('/accessories')({ beforeLoad: () => { throw redirect({ to: '/services', statusCode: 301, replace: true }); } });
