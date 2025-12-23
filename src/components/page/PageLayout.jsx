import React from "react";
import PageHeader from "./PageHeader";
import PageContent from "./PageContent";
import PageHeaderSkeleton from "@/components/skeleton/PageHeaderSkeleton";

const PageLayout = ({ 
  title,
  actions,
  loading = false,
  children,
  skeleton: CustomSkeleton = null,
  showHeaderSkeleton = true
}) => {
  return (
    <div className="float-left w-full">
      {loading && showHeaderSkeleton ? (
        <PageHeaderSkeleton showActions={!!actions} actionCount={actions?.length || 1} />
      ) : (
        title && <PageHeader title={title} actions={actions} />
      )}
      
      <PageContent loading={loading} headerSkeleton={false} skeleton={CustomSkeleton}>
        {children}
      </PageContent>
    </div>
  );
};

export default PageLayout;

