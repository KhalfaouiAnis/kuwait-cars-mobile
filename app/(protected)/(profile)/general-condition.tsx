import ProfileHeader from "@/core/components/layout/header/profile-header";
import Container from "@/core/components/ui/container";
import { useTranslation } from "react-i18next";
import { Text, View } from "react-native";

export default function GeneralConditionScreen() {
  const { t } = useTranslation("common");

  return (
    <Container
      scrollable
      header={<ProfileHeader title={t("profile.generalCondition")} />}
    >
      <View className="items-center m-4 mt-10 border border-primary-500 rounded-lg px-2 py-4 bg-white dark:bg-black">
        <Text className="font-inter text-black dark:text-white">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Saepe minus
          officiis consequuntur voluptatem delectus nemo earum impedit alias
          fugiat a quidem numquam excepturi cumque assumenda suscipit ea
          consequatur obcaecati, commodi fuga dolore laudantium! Commodi ea
          dignissimos ut odit quasi autem reiciendis illo voluptatum, veritatis
          temporibus, doloribus beatae optio officiis illum!
        </Text>
        <Text className="font-inter mt-4 text-black dark:text-white">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Hic, nobis!
          Sed, laudantium sequi ut earum voluptates numquam asperiores magni
          voluptas neque laboriosam. Eius assumenda sit itaque corrupti animi.
          Delectus voluptate nisi numquam. Fugiat vero, doloribus voluptatem
          rerum quas quo quaerat est, ratione alias consequuntur velit ex vel
          reiciendis voluptatum quisquam.
        </Text>
        <Text className="font-inter mt-4 text-black dark:text-white">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum,
          ipsa vel adipisci at incidunt illo harum fugit quo, distinctio
          exercitationem, enim accusamus unde. Veritatis ad tempora minus
          suscipit facere labore eos aut alias illum, voluptates consequuntur
          blanditiis maxime reprehenderit similique?
        </Text>
        <Text className="font-inter mt-4 text-black dark:text-white">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cupiditate
          quaerat suscipit vitae iste dolor accusamus nisi sequi esse error
          exercitationem.
        </Text>
      </View>
    </Container>
  );
}
