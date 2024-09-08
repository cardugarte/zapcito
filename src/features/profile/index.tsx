'use client';

import React, { useMemo } from 'react';
import { EnvelopeClosedIcon } from '@radix-ui/react-icons';
import { useLocalStorage } from 'usehooks-ts';
import useSWR from 'swr';

import { useAuth } from '@/hooks/use-auth';

import { convertToHex } from '@/lib/utils';

import { Button } from '@/components/ui/button';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import { Avatar } from '@/components/profile/avatar';
import { Website } from '@/components/profile/website';
import { Description } from '@/components/profile/description';
import { LightningAddress } from '@/components/profile/lightning-address';
import { Name } from '@/components/profile/name';
import { Banner } from '@/components/profile/banner';
import { Notes } from '@/components/notes';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { OnboardingModal } from '@/components/profile/onboarding-modal';
import { Following } from '@/components/profile/following';
import { Skeleton } from '@/components/ui/skeleton';
// import { EditProfile } from '@/components/profile/edit-profile';

import fetcher from '@/config/fetcher';

interface ProfileProps {
  value: string;
}

// interface ProfileData {
//   id: string;
//   name?: string;
//   displayName?: string;
//   image?: string;
//   banner?: string;
//   about?: string;
//   website?: string;
//   nip05?: string;
// }

export const Profile: React.FC<ProfileProps> = ({ value }) => {
  // Localstorage
  const [onboarding] = useLocalStorage('onboarding', false, { initializeWithValue: false });

  // Libs and hooks
  const { user } = useAuth();

  const pubkeyToHex = useMemo(() => convertToHex(value) || '', [value]);

  const { data: profile } = useSWR(`/api/user?pubkey=${pubkeyToHex}`, fetcher);
  const { data: notes, isLoading: isLoadingNotes } = useSWR(`/api/notes?pubkey=${pubkeyToHex}`, fetcher);

  return (
    <>
      <div className='pt-4'>
        <Banner value={profile?.banner} />
        <div className='relative mt-[-50px] mb-2 px-4'>
          <div className='flex justify-between items-end gap-4 w-full'>
            <Avatar src={profile?.picture} alt={profile?.name} variant='profile' />
            <div className='flex gap-1 items-center'>
              {pubkeyToHex === user?.id ? (
                <>{/* <EditProfile profile={profile as ProfileData} /> */}</>
              ) : (
                <>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <Button size='icon' variant='outline' disabled>
                          <EnvelopeClosedIcon />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Soon</p>
                      </TooltipContent>
                    </Tooltip>
                    {/* {!isLoading && (
                      <Button variant='outline' onClick={handleFollow} disabled={isLoading}>
                        {isFollowing ? 'Unfollow' : 'Follow'}
                      </Button>
                      )} */}
                  </TooltipProvider>
                </>
              )}
            </div>
          </div>
        </div>

        <div className='flex flex-col gap-4 w-full px-4'>
          <aside className='flex flex-col gap-1 w-full'>
            <Name value={profile?.name} />
            <LightningAddress value={profile?.nip05} />
            <Description value={profile?.about} />
            <Website value={profile?.website} />
          </aside>
        </div>

        <div className='flex items-center mt-4 space-x-4 px-4'>
          <Following pubkey={pubkeyToHex} />
        </div>

        <div className='mt-4 px-4'>
          <Tabs defaultValue='feed' className='w-full'>
            <TabsContent className='flex flex-col gap-4' value='feed'>
              {isLoadingNotes ? (
                <Skeleton className='w-full h-[100px] bg-card rounded-xl' />
              ) : (
                <div className='flex flex-col gap-2'>
                  {notes &&
                    notes.length > 0 &&
                    notes.map((post: any, key: any) => <Notes key={key} post={post} pubkey={pubkeyToHex} />)}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {onboarding && <OnboardingModal />}
    </>
  );
};
