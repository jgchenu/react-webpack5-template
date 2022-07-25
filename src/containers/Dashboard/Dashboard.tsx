import React, { useMemo } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import styles from './style.less';

function Dashboard() {
  const links = useMemo(
    () => [
      { to: '/messages', text: 'Messages' },
      { to: '/tasks', text: 'Tasks' },
    ],
    [],
  );
  return (
    <section className={styles.container}>
      <header className={styles.header}>header</header>
      <section className={styles.content}>
        <aside className={styles.aside}>
          {links.map((item) => (
            <NavLink to={item.to} key={item.to} className={(params) => (params.isActive ? styles.active : '')}>
              {item.text}
            </NavLink>
          ))}
        </aside>
        <main className={styles['sub-content']}>
          <Outlet />
        </main>
      </section>
    </section>
  );
}

export default Dashboard;
