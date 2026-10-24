import { createFileRoute, redirect } from '@tanstack/react-router';
export const Route = createFileRoute('/payment-instructions')({ beforeLoad: () => { throw redirect({ to: '/contact', statusCode: 301, replace: true }); } });
