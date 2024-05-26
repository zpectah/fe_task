import { useEffect, useRef, useCallback, useState } from 'react';
import { WithChildren } from '../../types';

export interface InfiniteScrollProps extends WithChildren {
  onNext: () => void;
  hasMore: boolean;
  isLoading?: boolean;
}

const InfiniteScroll = ({ children, onNext, hasMore, isLoading }: InfiniteScrollProps) => {
  const [loadLock, setLoadLock] = useState(true);

  const observer = useRef<IntersectionObserver | null>(null);
  const lastElementRef = useRef<HTMLDivElement | null>(null);

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const target = entries[0];

      if (target.isIntersecting && target.intersectionRatio > 0 && loadLock) {
        setLoadLock(false);
      }
    },
    [onNext, loadLock]
  );

  useEffect(() => {
    if (observer.current) {
      observer.current.disconnect();
    }
    observer.current = new IntersectionObserver(handleObserver, {});
    if (lastElementRef.current) {
      observer.current.observe(lastElementRef.current);
    }

    return () => {
      if (observer.current && lastElementRef.current) {
        observer.current.unobserve(lastElementRef.current);
      }
    };
  }, [handleObserver]);

  useEffect(() => {
    if (!loadLock && !isLoading) {
      setTimeout(() => {
        onNext();
        setLoadLock(true);
      }, 250);
    }
  }, [loadLock, isLoading]);

  return (
    <>
      {children}
      {!(isLoading || !hasMore) && (
        <div ref={lastElementRef} style={{ width: '100%', height: '10px', backgroundColor: 'transparent' }} />
      )}
    </>
  );
};

export default InfiniteScroll;
