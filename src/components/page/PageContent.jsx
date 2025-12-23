import React from "react";
import PageHeaderSkeleton from "@/components/skeleton/PageHeaderSkeleton";

const PageContent = ({ 
  loading = false, 
  headerSkeleton = true,
  children,
  skeleton: CustomSkeleton = null 
}) => {
  if (loading) {
    if (CustomSkeleton) {
      // CustomSkeleton is already a JSX element, return it directly
      return CustomSkeleton;
    }
    return (
      <>
        {headerSkeleton && <PageHeaderSkeleton />}
        <div className="float-left w-full">
          {children}
        </div>
      </>
    );
  }

  return <div className="float-left w-full">{children}</div>;
};

export default PageContent;

