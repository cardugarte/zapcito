interface ComponentProps {
  src: any;
}

export const Audio = (props: ComponentProps) => {
  // @ts-ignore
  const { src } = props;

  return (
    <div className='w-full p-4 bg-warning/10 rounded-lg border-[1px] border-dotted border-warning/35 text-center mt-2'>
      <span className='text-sm text-warning-foreground'>Audio under construction.</span>
    </div>
  );
};
