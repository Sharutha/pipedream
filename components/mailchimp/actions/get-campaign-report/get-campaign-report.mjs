import { removeNullEntries } from "../../common/utils.mjs";
import mailchimp from "../../mailchimp.app.mjs";

export default {
  key: "mailchimp-get-a-campaign-report",
  name: "Get A Campaign Report",
  description: "Gets a campaign report. [See docs here](https://mailchimp.com/developer/marketing/api/campaign-advice/)",
  version: "0.0.1",
  type: "action",
  props: {
    mailchimp,
    campaignId: {
      type: "string",
      label: "Campaign ID",
      description: "The unique id for the campaign",
    },
    fields: {
      propDefinition: [
        mailchimp,
        "fields",
      ],
    },
    excludeFields: {
      propDefinition: [
        mailchimp,
        "excludeFields",
      ],
    },
  },
  async run({ $ }) {
    const {
      fields,
      excludeFields,
      campaignId,
    } = this;
    const payload =  removeNullEntries({
      fields: fields.join(","),
      exclude_fields: excludeFields.join(","),
      campaignId,
    });
    const response = await this.mailchimp.findCampaignReport($, payload);
    response && $.export("$summary", "Campaign report found");
    return response;
  },
};
