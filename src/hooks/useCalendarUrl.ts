
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export const useCalendarUrl = () => {
  const [calUrl, setCalUrl] = useState('https://cal.com/snapstack/30-min');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCalUrl = async () => {
      try {
        const { data, error } = await supabase
          .from('portal_settings')
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
