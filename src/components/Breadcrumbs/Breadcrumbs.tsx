import { HomeIcon } from '@heroicons/react/24/solid';
import { useRouter } from 'next/router';
import Link from 'next/link';

const Breadcrumbs = () => {
  const router = useRouter();
  const pathSegments = router.asPath.split('/').filter(Boolean);
  const pages = [{ name: 'Manage', href: '/manage', current: false }];

  // Add the property ID segment to the breadcrumbs if available
  if (pathSegments.length > 1 && pathSegments[0] === 'manage') {
    const propertyId = pathSegments[1];
    pages.push({ name: `{id}`, href: `/manage/${propertyId}`, current: true });
  }

  return (
    <nav
      className="flex"
      aria-label="Breadcrumb"
    >
      <ol
        role="list"
        className="flex items-center space-x-4"
      >
        <li>
          <div>
            <HomeIcon
              className="h-5 w-5 flex-shrink-0"
              aria-hidden="true"
            />
            <span className="sr-only">Manage</span>
          </div>
        </li>
        {pages.map((page) => (
          <li key={page.name}>
            <div className="flex items-center">
              <svg
                className="h-5 w-5 flex-shrink-0 text-gray-300"
                fill="currentColor"
                viewBox="0 0 20 20"
                aria-hidden="true"
              >
                <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
              </svg>
              {page.name === '{id}' ? (
                <span className="ml-4 text-sm font-medium text-gray-500">
                  {router.query.id}
                </span>
              ) : (
                <Link
                  href={page.href}
                  className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700"
                  aria-current={page.current ? 'page' : undefined}
                >
                  {page.name}
                </Link>
              )}
            </div>
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
