'use client';

// Packages
import { useState } from 'react';
import { useRouter } from 'next/navigation';
// import { useLogin } from 'nostr-hooks';
import { toast } from 'sonner';

// Libs and hooks
import { useAuth } from '@/hooks/use-auth';

// Components
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeftIcon } from '@radix-ui/react-icons';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

export function Login() {
  // Flow
  const [secret, setSecret] = useState<string>('');

  // Libs and hooks
  const router = useRouter();

  // const { loginWithExtention } = useLogin();
  const { user, loading, loginWithSecretKey } = useAuth();

  if (user) {
    router.push('/');
    return null;
  }

  const handlePasteInput = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setSecret(text);
    } catch (error) {
      toast.info('Oops...');
      return null;
    }
  };

  return (
    <>
      <div className='flex justify-center items-center h-screen w-full bg-background'>
        <div className='flex flex-col items-center gap-4 max-w-md px-4'>
          <div className='flex flex-col gap-2 text-center'>
            <h2 className='text-semibold text-lg'>Login</h2>
            <p className='text-gray-500'>Lorem, ipsum dolor sit amet consectetur adipisicing elit.</p>
          </div>
          <Tabs defaultValue='secret' className='w-full'>
            <TabsList className='w-full bg-card'>
              <TabsTrigger className='flex-1' value='extension' disabled>
                Extension
              </TabsTrigger>
              <TabsTrigger className='flex-1' value='secret'>
                Secret key
              </TabsTrigger>
            </TabsList>
            {/* <TabsContent className='flex flex-col gap-4' value='extension'>
              <div className='flex flex-col gap-2'>
                <Button className='w-full' onClick={() => loginWithExtention()} disabled={false}>
                  Login with extension
                </Button>
                <Button className='w-full' onClick={() => router.push('/')} variant='ghost'>
                  <ArrowLeftIcon />
                  <p className='ml-2'>Back to home</p>
                </Button>
              </div>
              <div className='flex flex-col text-sm text-center'>
                <p className='text-gray-500'>Not have one installed yet?</p>
                <div className='flex justify-center items-center gap-1 text-sm'>
                  <span>We recommend installing </span>
                  <Button variant='link' size='sm' className='p-0 text-md' asChild>
                    <a href='https://getalby.com/' target='_blank'>
                      Alby
                    </a>
                  </Button>
                </div>
              </div>
            </TabsContent> */}
            <TabsContent className='flex flex-col gap-4' value='secret'>
              <div className='flex flex-col gap-2'>
                <Label htmlFor='secret'>Your private key</Label>
                <div className='relative w-full'>
                  <Input
                    className='pr-[70px]'
                    id='secret'
                    type='password'
                    placeholder='Format hex or nsec...'
                    value={secret}
                    onChange={(e) => setSecret(e.target.value)}
                  />
                  <div className='absolute top-0 right-[2px] flex items-center h-full'>
                    <Button variant='ghost' size='sm' onClick={handlePasteInput}>
                      Paste
                    </Button>
                  </div>
                </div>
              </div>
              <div className='flex flex-col gap-2'>
                <Button
                  className='w-full'
                  disabled={!secret || loading}
                  onClick={() => loginWithSecretKey({ secretKey: secret })}
                >
                  {loading ? 'Loading' : 'Login'}
                </Button>
                <Button className='w-full' onClick={() => router.push('/')} variant='ghost'>
                  <ArrowLeftIcon />
                  <p className='ml-2'>Back to home</p>
                </Button>
              </div>
              {/* <div className='text-sm text-center'>
                <p className='text-gray-500'>¿Aún no tenés?</p>
                <Button variant='link' size='sm' asChild>
                  <a href=''>Generar una aleatoria</a>
                </Button>
              </div> */}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
}
