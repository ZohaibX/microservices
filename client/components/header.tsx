import Link from 'next/link';

export interface UserData {
  email?: string;
}
const Header = ({ userData }: { userData: UserData }) => {
  const links = [
    !userData && { label: 'Sign Up', href: '/auth/signUp' },
    !userData && { label: 'Sign In', href: '/auth/signIn' },
    userData && { label: 'Sign Out', href: '/auth/signOut' },
  ]
    .filter((trueLinks) => trueLinks) // it will return only trues
    .map(({ label, href }: any) => (
      <li key={href} className='nav-item'>
        <Link href={href}>
          <a className='nav-link'>{label}</a>
        </Link>
      </li>
    ));

  return (
    <nav className='navbar navbar-light bg-light'>
      <Link href='/'>
        <a className='navbar-brand'>Main</a>
      </Link>

      <div className='d-flex justify-content-end'>
        <ul className='nav d-flex align-items-center'>{links}</ul>
      </div>
    </nav>
  );
};

export default Header;
