import React from 'react';
import './TemplatePage.scss'
import PageTitle from '../../shared/components/Title/PageTitle/PageTitle';
import Navigation from '../../widgets/Navigation/Navigation';

interface TemplatePageProps {
  children: React.ReactNode;
  title: string;
}

const TemplatePage = (props: TemplatePageProps) => {
  const { title, children } = props;
  return (
    <div className='template-page'>
      <Navigation />
      <div className="page-container">
        <PageTitle title={title} />
        {children}
      </div>
    </div>
  );
};

export default TemplatePage;