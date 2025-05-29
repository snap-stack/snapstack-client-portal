
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export const useCalendarUrl = () => {
  const [calUrl, setCalUrl] = useState('https://cal.com/snapstack/30-min');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCalUrl = async () => {
      try {
        const { data } = await supabase
          .from('site_config')
          .select('cal_url')
          .single();

        if (data && data.cal_url) {
          setCalUrl(data.cal_url);
        }
      } catch (error) {
        console.log('Using default calendar URL:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCalUrl();
  }, []);

  return { calUrl, isLoading };
};
