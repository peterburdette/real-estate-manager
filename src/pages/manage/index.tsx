import PropertyCardGrid from '@/components/PropertyCardGrid/PropertyCardGrid';
import { GetProperties } from '@/server/properties/GetPropertiesApi';

const Manage = ({ data }: { data: any }) => {
  return (
    <div className="min-h-full">
      <div className="mx-auto px-4 pb-12 sm:px-6 lg:px-8">
        <PropertyCardGrid properties={data} />
      </div>
    </div>
  );
};

export const getServerSideProps = async () => {
  try {
    const data = await GetProperties();

    return {
      props: {
        data,
        error: false,
      },
    };
  } catch (error: any) {
    console.error('Error fetching property data:', error.message);

    return {
      props: {
        error: true,
      },
    };
  }
};

export default Manage;
