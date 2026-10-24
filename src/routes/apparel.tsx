import { createFileRoute, redirect } from '@tanstack/react-router';
export const Route = createFileRoute('/apparel')({ beforeLoad: () => { throw redirect({ to: '/services', statusCode: 301, replace: true }); } });
