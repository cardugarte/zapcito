// @ts-nocheck

import * as React from 'react';

import { cn } from '@/lib/utils';
import { useMediaQuery } from '@/hooks/use-media-query';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState } from 'react';
import { Textarea } from './ui/textarea';

export function DrawerDialogDemo(props: any) {
  const { profile } = props;

  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery('(min-width: 768px)');

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant='outline'>Edit Profile</Button>
        </DialogTrigger>
        <DialogContent className='sm:max-w-[425px]'>
          <DialogHeader className='flex w-full text-left'>
            <DialogTitle>Edit profile</DialogTitle>
            {/* <DialogDescription>Make changes to your profile here. Click save when you're done.</DialogDescription> */}
          </DialogHeader>
          <ProfileForm profile={profile} />
          <Button size='sm'>Guardar</Button>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant='outline'>Edit Profile</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className='flex justify-between items-center text-left'>
          <DrawerTitle>Edit profile</DrawerTitle>
          <div>
            <Button size='sm'>Guardar</Button>
          </div>
          {/* <DrawerDescription>Make changes to your profile here. Click save when you're done.</DrawerDescription> */}
        </DrawerHeader>
        <div className='px-4'>
          <ProfileForm profile={profile} />
        </div>
        <DrawerFooter className='pt-2'>
          <DrawerClose asChild>
            <Button variant='outline'>Cancelar</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

function ProfileForm(props: any) {
  const { className, profile } = props;

  const [open, setOpen] = useState(false);

  // Flow
  const [name, setName] = useState(profile?.displayName || '');
  const [description, setDescription] = useState(profile?.about || '');
  const [link, setLink] = useState(profile?.website || null);
  const [profilePhoto, setProfilePhoto] = useState(profile?.image || '/profile.png');
  const [coverPhoto, setCoverPhoto] = useState(profile?.banner || '/banner.png');

  const handleFileChange = (event: any, setPhoto: any) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      //@ts-ignore
      reader.onload = (e) => setPhoto(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      {/* <form className={cn('grid items-start gap-4', className)}>
      <div className='grid gap-2'>
        <Label htmlFor='email'>Email</Label>
        <Input type='email' id='email' defaultValue='shadcn@example.com' />
      </div>
      <div className='grid gap-2'>
        <Label htmlFor='username'>Username</Label>
        <Input id='username' defaultValue='@shadcn' />
      </div>
      <Button type='submit'>Save changes</Button>
    </form> */}
      <div className='flex flex-col gap-2'>
        <div className='relative h-32 bg-muted rounded-lg overflow-hidden w-full object-cover'>
          <img src={coverPhoto || '/banner.png'} alt='Cover' className='w-full h-full object-cover' />
          <Label
            htmlFor='cover-photo'
            className='absolute top-0 lef-0 flex justify-center items-center w-full h-full bg-background/10'
          >
            <CameraIcon className='h-6 w-6 text-white' />
            <Input
              id='cover-photo'
              type='file'
              className='sr-only'
              onChange={(e) => handleFileChange(e, setCoverPhoto)}
              accept='image/*'
            />
          </Label>
        </div>
        <div className='overflow-hidden relative mt-[-60px] w-[80px] h-[80px] mx-4 rounded-full border-2 border-background'>
          <img src={profilePhoto || '/profile.png'} alt='Profile' />
          <Label
            htmlFor='profile-photo'
            className='absolute top-0 lef-0 flex justify-center items-center w-full h-full bg-background/50'
            tabIndex={1}
          >
            <CameraIcon className='h-6 w-6 text-white' />
            <Input
              id='profile-photo'
              type='file'
              className='sr-only'
              onChange={(e) => handleFileChange(e, setProfilePhoto)}
              accept='image/*'
            />
          </Label>
        </div>
        <div className='flex flex-col gap-2'>
          <Label htmlFor='name'>Name</Label>
          <Input id='name' value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className='flex flex-col gap-2'>
          <Label htmlFor='description'>Description</Label>
          <Textarea id='description' value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>
        <div className='flex flex-col gap-2'>
          <Label htmlFor='link'>Link</Label>
          <Input id='link' value={link} onChange={(e) => setLink(e.target.value)} />
        </div>
      </div>
    </>
  );
}

function CameraIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 24 24'
      width='24'
      height='24'
      color='currentcolor'
      fill='none'
    >
      <path
        d='M7.00018 6.00055C5.77954 6.00421 5.10401 6.03341 4.54891 6.2664C3.77138 6.59275 3.13819 7.19558 2.76829 7.96165C2.46636 8.58693 2.41696 9.38805 2.31814 10.9903L2.1633 13.501C1.91757 17.4854 1.7947 19.4776 2.96387 20.7388C4.13303 22 6.10271 22 10.0421 22H13.9583C17.8977 22 19.8673 22 21.0365 20.7388C22.2057 19.4776 22.0828 17.4854 21.8371 13.501L21.6822 10.9903C21.5834 9.38805 21.534 8.58693 21.2321 7.96165C20.8622 7.19558 20.229 6.59275 19.4515 6.2664C18.8964 6.03341 18.2208 6.00421 17.0002 6.00055'
        stroke='currentColor'
        stroke-width='1.5'
        stroke-linecap='round'
      />
      <path
        d='M17 7L16.1142 4.78543C15.732 3.82996 15.3994 2.7461 14.4166 2.25955C13.8924 2 13.2616 2 12 2C10.7384 2 10.1076 2 9.58335 2.25955C8.6006 2.7461 8.26801 3.82996 7.88583 4.78543L7 7'
        stroke='currentColor'
        stroke-width='1.5'
        stroke-linecap='round'
        stroke-linejoin='round'
      />
      <path
        d='M15.5 14C15.5 15.933 13.933 17.5 12 17.5C10.067 17.5 8.5 15.933 8.5 14C8.5 12.067 10.067 10.5 12 10.5C13.933 10.5 15.5 12.067 15.5 14Z'
        stroke='currentColor'
        stroke-width='1.5'
      />
      <path
        d='M11.9998 6H12.0088'
        stroke='currentColor'
        stroke-width='2'
        stroke-linecap='round'
        stroke-linejoin='round'
      />
    </svg>
  );
}
