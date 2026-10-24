import { createFileRoute, redirect } from '@tanstack/react-router';
export const Route = createFileRoute('/programs')({ beforeLoad: () => { throw redirect({ to: '/packages', statusCode: 301, replace: true }); } });
