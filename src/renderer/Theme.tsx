import React from 'react';
import './styles/App.css';
import './styles/variables.scss';
import './styles/fonts.scss';

export default function Theme({
  mode,
  children,
}: {
  mode: 'default' | 'dark';
  children: React.ReactNode;
}) {
  return <span className={`${mode}-theme`}>{children}</span>;
}
